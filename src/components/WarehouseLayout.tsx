import React, { useRef, useEffect, useState } from 'react';

// Mock data for warehouse layout
const warehouseData = {
  width: 800,
  height: 600,
  pallets: [
    { id: 1, x: 50, y: 50, width: 40, height: 40, product: 'Widget A', stock: 120 },
    { id: 2, x: 100, y: 50, width: 40, height: 40, product: 'Gadget B', stock: 45 },
    { id: 3, x: 50, y: 100, width: 40, height: 40, product: 'Tool C', stock: 80 },
    { id: 4, x: 100, y: 100, width: 40, height: 40, product: 'Part D', stock: 15 },
    { id: 5, x: 150, y: 100, width: 40, height: 40, product: 'Component E', stock: 200 },
    { id: 6, x: 250, y: 200, width: 40, height: 40, product: 'Widget A', stock: 120 },
    { id: 7, x: 300, y: 200, width: 40, height: 40, product: 'Gadget B', stock: 45 },
    { id: 8, x: 250, y: 250, width: 40, height: 40, product: 'Tool C', stock: 80 },
    { id: 9, x: 300, y: 250, width: 40, height: 40, product: 'Part D', stock: 15 },
    { id: 10, x: 350, y: 250, width: 40, height: 40, product: 'Component E', stock: 200 },
    { id: 11, x: 450, y: 350, width: 40, height: 40, product: 'Widget A', stock: 120 },
    { id: 12, x: 500, y: 350, width: 40, height: 40, product: 'Gadget B', stock: 45 },
    { id: 13, x: 450, y: 400, width: 40, height: 40, product: 'Tool C', stock: 80 },
    { id: 14, x: 500, y: 400, width: 40, height: 40, product: 'Part D', stock: 15 },
    { id: 15, x: 550, y: 400, width: 40, height: 40, product: 'Component E', stock: 200 },
  ],
  aisles: [
    { id: 1, x: 200, y: 0, width: 30, height: 600 },
    { id: 2, x: 400, y: 0, width: 30, height: 600 },
    { id: 3, x: 600, y: 0, width: 30, height: 600 },
  ]
};

function WarehouseLayout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [hoveredPallet, setHoveredPallet] = useState<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(translate.x, translate.y);
    ctx.scale(scale, scale);

    // Draw warehouse boundary
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, warehouseData.width, warehouseData.height);

    // Draw aisles
    ctx.fillStyle = '#e2e8f0';
    warehouseData.aisles.forEach(aisle => {
      ctx.fillRect(aisle.x, aisle.y, aisle.width, aisle.height);
    });

    // Draw pallets
    warehouseData.pallets.forEach(pallet => {
      // Color based on stock level
      if (pallet.stock < 50) {
        ctx.fillStyle = '#feb2b2'; // Red for low stock
      } else if (pallet.stock < 100) {
        ctx.fillStyle = '#fefcbf'; // Yellow for medium stock
      } else {
        ctx.fillStyle = '#c6f6d5'; // Green for high stock
      }

      ctx.fillRect(pallet.x, pallet.y, pallet.width, pallet.height);
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 1;
      ctx.strokeRect(pallet.x, pallet.y, pallet.width, pallet.height);

      // Label pallet
      ctx.fillStyle = '#2d3748';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pallet.product.split(' ')[1], pallet.x + pallet.width / 2, pallet.y + pallet.height / 2 + 5);
    });

    ctx.restore();

    // Draw info box for hovered pallet
    if (hoveredPallet) {
      const screenX = hoveredPallet.x * scale + translate.x;
      const screenY = hoveredPallet.y * scale + translate.y;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(screenX + 45, screenY, 120, 60);
      
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Product: ${hoveredPallet.product}`, screenX + 50, screenY + 15);
      ctx.fillText(`Stock: ${hoveredPallet.stock}`, screenX + 50, screenY + 30);
      ctx.fillText(`Location: (${Math.floor(hoveredPallet.x/100)}, ${Math.floor(hoveredPallet.y/100)})`, screenX + 50, screenY + 45);
    }
  }, [translate, scale, hoveredPallet]);

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const worldX = (x - translate.x) / scale;
    const worldY = (y - translate.y) / scale;

    const delta = -Math.sign(e.deltaY) * 0.1;
    const newScale = Math.max(0.1, Math.min(10, scale + delta));

    const newTranslateX = x - worldX * newScale;
    const newTranslateY = y - worldY * newScale;

    setScale(newScale);
    setTranslate({ x: newTranslateX, y: newTranslateY });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setStartDragPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check for pallet hover
    const worldX = (mouseX - translate.x) / scale;
    const worldY = (mouseY - translate.y) / scale;
    let foundPallet = null;
    for (const pallet of warehouseData.pallets) {
      if (
        worldX >= pallet.x && 
        worldX <= pallet.x + pallet.width && 
        worldY >= pallet.y && 
        worldY <= pallet.y + pallet.height
      ) {
        foundPallet = pallet;
        break;
      }
    }
    setHoveredPallet(foundPallet);

    if (isDragging) {
      setTranslate({
        x: mouseX - startDragPosition.x + translate.x,
        y: mouseY - startDragPosition.y + translate.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setTranslate({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-xl font-semibold mb-4">Warehouse Layout</h2>
      <div className="relative overflow-hidden border border-gray-300 rounded-md" style={{ width: '100%', height: '600px' }}>
        <canvas
          ref={canvasRef}
          width={850}
          height={600}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`cursor-${isDragging ? 'grabbing' : hoveredPallet ? 'pointer' : 'grab'}`}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-300 mr-1"></div>
            <span>High Stock (&gt;100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-300 mr-1"></div>
            <span>Medium Stock (50-100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-300 mr-1"></div>
            <span>Low Stock (&lt;50)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 mr-1"></div>
            <span>Aisles</span>
          </div>
        </div>
        <div>
          <button 
            onClick={handleReset}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset View
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">Use mouse wheel to zoom, click and drag to pan.</p>
    </div>
  );
}

export default WarehouseLayout;
