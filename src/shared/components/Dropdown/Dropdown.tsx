import {
    ComponentPropsWithRef,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

import Button from '@/shared/components/Button';
import { StyledButton } from '@/shared/components/Close/Close.style';
import { DropdownMenu } from '@/shared/components/Dropdown/Dropdown.style';

export interface DropdownProps extends ComponentPropsWithRef<'ul'> {
    /**
     * Label for the button, can be a string or an icon
     */
    label: ReactNode;
    /**
     * Optional aria-label for the button using an icon
     */
    buttonLabel?: string;
}

/**
 * A UI component which renders a menu that can be toggled on and off
 */
const Dropdown = ({
    label,
    children,
    buttonLabel,
    ...defaultProps
}: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const [dropdownTop, setDropdownTop] = useState<number | null>(0);
    const [dropdownLeft, setDropdownLeft] = useState<number | null>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLUListElement>(null);

    const handleClick = () => {
        if (!open) {
            const contentHeight = contentRef.current?.clientHeight ?? 0;
            const contentWidth = contentRef.current?.clientWidth ?? 0;

            const topSpaceRemaining =
                window.innerHeight -
                (buttonRef.current?.getBoundingClientRect().bottom ?? 0);
            const leftSpaceRemaining =
                window.innerWidth -
                ((buttonRef.current?.getBoundingClientRect().left ?? 0) +
                    contentHeight);

            const topPosition =
                topSpaceRemaining > contentHeight
                    ? null
                    : topSpaceRemaining - contentHeight;
            const leftPosition =
                leftSpaceRemaining > contentWidth
                    ? null
                    : leftSpaceRemaining - contentWidth;

            setDropdownTop(topPosition);
            setDropdownLeft(leftPosition);
        }
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                (typeof target.className === 'string' &&
                    target.className.includes('menu-button')) ||
                (dropdownRef.current && !dropdownRef.current.contains(target))
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            {typeof label === 'string' ? (
                <Button
                    ref={buttonRef}
                    label={label}
                    appearance="secondary"
                    onClick={handleClick}
                />
            ) : (
                <StyledButton
                    ref={buttonRef}
                    aria-label={buttonLabel}
                    onClick={handleClick}
                >
                    {label}
                </StyledButton>
            )}

            <DropdownMenu
                {...defaultProps}
                ref={contentRef}
                $top={dropdownTop}
                $left={dropdownLeft}
                $open={open}
            >
                {children}
            </DropdownMenu>
        </div>
    );
};
export default Dropdown;
