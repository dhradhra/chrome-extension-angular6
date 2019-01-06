import {FullUnit} from './full-unit';

export interface FullVerticalLayer {
    units: FullUnit[];
    height: number;
    hasGhost?: string;
    isSpacer?: boolean;
    isDragging?: boolean;
    flexDirection?: string;
    flex?: number | string;
    showTopGhost?: boolean;
    showBottomGhost?: boolean;

    hasBottomDraggableArea?: boolean;

    ghostWidth?: number | string;
    ghostPosition?: {
        top: boolean,
        bottom: boolean,
        left: boolean,
        right: boolean,
    };
    ghostLeftMargin?: number | string;

    widgetsWrapperWidth?: number | string;
    widgetsWrapperFlex?: number | string;
    widgetsWrapperLeftMargin?: number | string;
    widgetsWrapperRightMargin?: number | string;
}
