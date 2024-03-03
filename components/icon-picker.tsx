// Importing necessary components and hooks
"use client" // Assuming it's a pragma to specify client-side rendering

import EmojiPicker, { Theme } from 'emoji-picker-react'; // Importing EmojiPicker and Theme from 'emoji-picker-react' library
import { useTheme } from 'next-themes'; // Importing useTheme hook from 'next-themes' library
import { 
    Popover,
    PopoverTrigger,
    PopoverContent,
 } from './ui/popover'; // Importing Popover components from local file './ui/popover'

// Defining props interface for IconPicker component
interface IconPickerProps {
    onChange: (icon: string) => void; // Function to handle icon change
    children: React.ReactNode; // Children elements passed to the component
    asChild?: boolean; // Boolean indicating whether to render as child or not
}

// IconPicker component definition
export const IconPicker = ({
    onChange,
    children,
    asChild
}: IconPickerProps) => {
    // Using useTheme hook to get the current theme
    const { resolvedTheme } = useTheme(); 
    // Resolving the current theme to light or dark
    const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;

    // Mapping between Next.js theme and Emoji Picker theme
    const themeMap = {
        "dark": Theme.DARK, // Mapping Next.js dark theme to Emoji Picker dark theme
        "light": Theme.LIGHT // Mapping Next.js light theme to Emoji Picker light theme
    };

    // Getting the theme from themeMap based on the current theme
    const theme = themeMap[currentTheme];

    // Rendering IconPicker component
    return (
        <Popover>
            {/* Rendering PopoverTrigger */}
            <PopoverTrigger asChild={asChild}>
                {children} {/* Rendering children passed to the component */}
            </PopoverTrigger>
            {/* Rendering PopoverContent */}
            <PopoverContent className='p-0 w-full border-none shadow-none'>
                {/* Rendering EmojiPicker component */}
                <EmojiPicker 
                    height={350} // Setting height of the EmojiPicker
                    theme={theme} // Setting theme of the EmojiPicker
                    onEmojiClick={(data) => onChange(data.emoji)} // Handling emoji click event
                />
            </PopoverContent>
        </Popover>
    );
}
