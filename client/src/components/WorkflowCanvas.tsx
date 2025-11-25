import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface WorkflowNode {
  id: string;
  type: string;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
}

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  email: string;
  className?: string;
}

export default function WorkflowCanvas({ nodes, email, className = '' }: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Draw workflow on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw connections first (so they appear behind nodes)
    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const targetNode = nodes.find((n) => n.id === targetId);
        if (targetNode) {
          drawConnection(ctx, node.position, targetNode.position);
        }
      });
    });

    // Draw nodes
    nodes.forEach((node) => {
      drawNode(ctx, node);
    });

    // Draw watermark
    drawWatermark(ctx, email, canvas.width, canvas.height);

    ctx.restore();
  }, [nodes, zoom, pan, email]);

  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)'; // violet-500 with opacity
    ctx.lineWidth = 2;

    // Draw curved line (bezier curve)
    const midX = (from.x + to.x) / 2;
    ctx.moveTo(from.x + 40, from.y); // Start from right edge of node
    ctx.bezierCurveTo(
      midX, from.y,
      midX, to.y,
      to.x - 40, to.y // End at left edge of target node
    );
    ctx.stroke();

    // Draw arrow head
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const arrowLength = 10;
    ctx.beginPath();
    ctx.moveTo(to.x - 40, to.y);
    ctx.lineTo(
      to.x - 40 - arrowLength * Math.cos(angle - Math.PI / 6),
      to.y - arrowLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(to.x - 40, to.y);
    ctx.lineTo(
      to.x - 40 - arrowLength * Math.cos(angle + Math.PI / 6),
      to.y - arrowLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: WorkflowNode) => {
    const { x, y } = node.position;
    const nodeWidth = 80;
    const nodeHeight = 80;

    // Draw node background (glassmorphism effect)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)'; // slate-800 with opacity
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)'; // violet-500 border
    ctx.lineWidth = 2;

    // Draw rounded rectangle
    const radius = 12;
    ctx.beginPath();
    ctx.moveTo(x - nodeWidth / 2 + radius, y - nodeHeight / 2);
    ctx.lineTo(x + nodeWidth / 2 - radius, y - nodeHeight / 2);
    ctx.quadraticCurveTo(x + nodeWidth / 2, y - nodeHeight / 2, x + nodeWidth / 2, y - nodeHeight / 2 + radius);
    ctx.lineTo(x + nodeWidth / 2, y + nodeHeight / 2 - radius);
    ctx.quadraticCurveTo(x + nodeWidth / 2, y + nodeHeight / 2, x + nodeWidth / 2 - radius, y + nodeHeight / 2);
    ctx.lineTo(x - nodeWidth / 2 + radius, y + nodeHeight / 2);
    ctx.quadraticCurveTo(x - nodeWidth / 2, y + nodeHeight / 2, x - nodeWidth / 2, y + nodeHeight / 2 - radius);
    ctx.lineTo(x - nodeWidth / 2, y - nodeHeight / 2 + radius);
    ctx.quadraticCurveTo(x - nodeWidth / 2, y - nodeHeight / 2, x - nodeWidth / 2 + radius, y - nodeHeight / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw icon (emoji) - ICON ONLY, NO LABELS
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(node.icon, x, y);

    // Add subtle glow effect
    ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(node.icon, x, y);
    ctx.shadowBlur = 0;
  };

  const drawWatermark = (
    ctx: CanvasRenderingContext2D,
    email: string,
    width: number,
    height: number
  ) => {
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.3)'; // slate-400 with low opacity
    ctx.fillText(`Conceived Automations - Workflow Preview for ${email}`, width / 2 / zoom, (height - 30) / zoom);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-move bg-slate-950 rounded-2xl border border-violet-500/30"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleZoomIn}
          className="bg-slate-800/80 backdrop-blur-md border-violet-500/30 hover:border-violet-500/60"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleZoomOut}
          className="bg-slate-800/80 backdrop-blur-md border-violet-500/30 hover:border-violet-500/60"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleResetView}
          className="bg-slate-800/80 backdrop-blur-md border-violet-500/30 hover:border-violet-500/60"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-md border border-violet-500/30 rounded-lg px-4 py-2">
        <p className="text-sm text-slate-300">
          🖱️ <span className="font-semibold">Drag</span> to pan • <span className="font-semibold">Scroll</span> to zoom
        </p>
      </div>

      {/* IP Protection notice */}
      <div className="absolute top-4 right-4 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 rounded-lg px-4 py-2 max-w-xs">
        <p className="text-xs text-amber-200">
          🔒 <span className="font-semibold">IP Protected:</span> Icons only shown to protect our proprietary workflow design
        </p>
      </div>
    </div>
  );
}
