import type { ActiveTool, Editor } from "../types";
import { FILL_COLOR } from "../types";
import { ToolSidebarClose } from "../ToolSidebarClose";
import { ToolSidebarHeader } from "../ToolSidebarHeader";
import { ColorPicker } from "../ColorPicker";
import { ScrollArea } from "../ScrollArea";

interface FillColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FillColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FillColorSidebarProps) => {
    const value = editor?.getActiveFillColor() || FILL_COLOR;

    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };

    return (
        <aside
            style={{
                display: activeTool === "fill" ? "flex" : "none",
                backgroundColor: 'white',
                position: 'relative',
                borderRight: '1px solid #e5e7eb',
                zIndex: 40,
                width: '300px',
                height: '100%',
                flexDirection: 'column',
                overflow: 'visible'
            }}
        >
            <ToolSidebarHeader
                title="Fill color"
                description="Add fill color to your element"
            />
            <ScrollArea>
                <div style={{ padding: '16px' }}>
                    <ColorPicker
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};
