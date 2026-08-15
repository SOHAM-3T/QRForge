import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQRStore } from '@/store/qr-store';
import { PatternSelector } from './PatternSelector';
import { EyeStyleSelector } from './EyeStyleSelector';
import { ColorPicker } from './ColorPicker';
import { LogoPanel } from './LogoPanel';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function DesignPanel() {
  const { design, updateDesign } = useQRStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Design Controls</h2>
      </div>

      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-6 animate-fade-in">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Body Pattern</Label>
            <PatternSelector 
              type={design.dotType} 
              onChange={(dotType) => updateDesign({ dotType })} 
            />
          </div>

          <div className="border-t border-border/50 pt-4 space-y-3">
            <Label className="text-sm font-semibold">Eye Style</Label>
            <EyeStyleSelector
              squareType={design.cornerSquareType}
              dotType={design.cornerDotType}
              onChangeSquare={(cornerSquareType) => updateDesign({ cornerSquareType })}
              onChangeDot={(cornerDotType) => updateDesign({ cornerDotType })}
            />
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Foreground Color"
              color={design.dotColor.color}
              onChange={(color) => updateDesign({ 
                dotColor: { ...design.dotColor, color },
                cornerSquareColor: { ...design.cornerSquareColor, color },
                cornerDotColor: { ...design.cornerDotColor, color },
              })}
            />
            <ColorPicker
              label="Background Color"
              color={design.backgroundColor.color}
              onChange={(color) => updateDesign({ 
                backgroundColor: { ...design.backgroundColor, color }
              })}
            />
          </div>
          <div className="text-xs text-muted-foreground bg-accent/50 p-3 rounded-lg border border-border/50">
            Note: Advanced gradient controls will be added in a future update. The current color picker changes the overall foreground and background colors.
          </div>
        </TabsContent>

        <TabsContent value="logo" className="space-y-6 animate-fade-in">
          <LogoPanel />
        </TabsContent>

        <TabsContent value="options" className="space-y-6 animate-fade-in">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Margin Size</Label>
              <span className="text-xs text-muted-foreground">{design.margin}px</span>
            </div>
            <Slider
              value={[design.margin]}
              min={0}
              max={50}
              step={1}
              onValueChange={([margin]) => updateDesign({ margin })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
