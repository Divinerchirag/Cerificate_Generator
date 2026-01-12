import React, { useRef, useEffect, useState, useCallback } from "react";
import * as fabric from "fabric";
import "./CanvasEditor.css";

interface CanvasEditorProps {
  canvasId: string;
  initialData?: string;
  onSave?: (data: string) => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  canvasId,
  initialData,
  onSave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] =
    useState<fabric.FabricObject | null>(null);
  const [activeTab, setActiveTab] = useState<
    "templates" | "text" | "shapes" | "images" | "background"
  >("templates");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff",
        selection: true,
      });

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  const handleSave = useCallback(() => {
    if (!canvas || !onSave) return;
    const data = JSON.stringify(canvas.toJSON());
    onSave(data);
  }, [canvas, onSave]);

  return (
    <div className="editor-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="tabs">
          {(
            ["templates", "text", "shapes", "images", "background"] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? "active-tab" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <h3>{activeTab.toUpperCase()}</h3>
        </div>
      </div>

      {/* Main Area */}
      <div className="main-content">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            {selectedObject && (
              <>
                <button className="btn danger">Delete</button>
                <button className="btn">Duplicate</button>
                <button className="btn">Front</button>
                <button className="btn">Back</button>
              </>
            )}
          </div>

          <div className="toolbar-right">
            <button onClick={handleSave} className="btn primary">
              Save
            </button>
            <button className="btn gradient">Export PNG</button>
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-wrapper">
          <div className="canvas-shadow">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
