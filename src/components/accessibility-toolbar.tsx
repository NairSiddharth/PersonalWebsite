import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Type, Eye, MousePointer, Keyboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type FontSizeKey = 'small' | 'normal' | 'large' | 'xlarge';

export function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState<FontSizeKey>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    // Apply font size to document
    const fontSizeMap: Record<FontSizeKey, string> = {
      small: '14px',
      normal: '16px',
      large: '18px',
      xlarge: '20px'
    };
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  useEffect(() => {
    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--transition-duration');
    }
  }, [reducedMotion]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Enhanced focus indicators
    if (focusMode) {
      document.documentElement.classList.add('focus-mode');
    } else {
      document.documentElement.classList.remove('focus-mode');
    }
  }, [focusMode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50">
          <Settings className="w-4 h-4" />
          <span className="sr-only">Accessibility Settings</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Accessibility
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Font Size Controls */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Font Size
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-1 p-1">
          {[
            { key: 'small' as const, label: 'S', title: 'Small' },
            { key: 'normal' as const, label: 'M', title: 'Normal' },
            { key: 'large' as const, label: 'L', title: 'Large' },
            { key: 'xlarge' as const, label: 'XL', title: 'Extra Large' }
          ].map(size => (
            <Button
              key={size.key}
              variant={fontSize === size.key ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setFontSize(size.key)}
              title={size.title}
            >
              <Type className="w-3 h-3 mr-1" />
              {size.label}
            </Button>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Toggle Options */}
        <DropdownMenuItem 
          onClick={() => setReducedMotion(!reducedMotion)}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <MousePointer className="w-4 h-4" />
            Reduce Motion
          </span>
          <div className={`w-4 h-4 rounded-sm border ${reducedMotion ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
            {reducedMotion && (
              <div className="w-full h-full flex items-center justify-center text-primary-foreground text-xs">
                ✓
              </div>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setHighContrast(!highContrast)}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            High Contrast
          </span>
          <div className={`w-4 h-4 rounded-sm border ${highContrast ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
            {highContrast && (
              <div className="w-full h-full flex items-center justify-center text-primary-foreground text-xs">
                ✓
              </div>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setFocusMode(!focusMode)}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Keyboard className="w-4 h-4" />
            Enhanced Focus
          </span>
          <div className={`w-4 h-4 rounded-sm border ${focusMode ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
            {focusMode && (
              <div className="w-full h-full flex items-center justify-center text-primary-foreground text-xs">
                ✓
              </div>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1 text-xs text-muted-foreground">
          Use Tab to navigate • Press Enter to select
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}