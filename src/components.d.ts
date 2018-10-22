/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface AppArrows {
    'dataName': string;
    'direction': string;
    'selected': boolean;
    'text': string;
  }
  interface AppArrowsAttributes extends StencilHTMLAttributes {
    'dataName'?: string;
    'direction'?: string;
    'selected'?: boolean;
    'text'?: string;
  }

  interface AppBackdrop {
    'open': boolean;
  }
  interface AppBackdropAttributes extends StencilHTMLAttributes {
    'open'?: boolean;
  }

  interface AppButton {
    'disabled': boolean;
    'type': string;
  }
  interface AppButtonAttributes extends StencilHTMLAttributes {
    'disabled'?: boolean;
    'type'?: string;
  }

  interface AppControl {
    'instrumType': string[];
    'productLevel': string;
    'searchTerm': string;
    'selectedCats': string[];
    'selectedExs': string[];
  }
  interface AppControlAttributes extends StencilHTMLAttributes {
    'instrumType'?: string[];
    'onNewInstrumType'?: (event: CustomEvent) => void;
    'onNewProductLevel'?: (event: CustomEvent) => void;
    'onNewSearch'?: (event: CustomEvent) => void;
    'onResetFilter'?: (event: CustomEvent) => void;
    'productLevel'?: string;
    'searchTerm'?: string;
    'selectedCats'?: string[];
    'selectedExs'?: string[];
  }

  interface AppInfoTable {
    'data': any;
  }
  interface AppInfoTableAttributes extends StencilHTMLAttributes {
    'data'?: any;
  }

  interface AppMain {
    'nrowPage': number;
  }
  interface AppMainAttributes extends StencilHTMLAttributes {
    'nrowPage'?: number;
    'onOpenModal'?: (event: CustomEvent) => void;
  }

  interface AppModal {
    'closeButton': boolean;
    'closeButtonText': string;
    'confirmButton': boolean;
    'confirmButtonText': string;
    'modalTitle': string;
    'open': boolean;
  }
  interface AppModalAttributes extends StencilHTMLAttributes {
    'closeButton'?: boolean;
    'closeButtonText'?: string;
    'confirmButton'?: boolean;
    'confirmButtonText'?: string;
    'modalTitle'?: string;
    'onCloseModal'?: (event: CustomEvent) => void;
    'open'?: boolean;
  }

  interface AppMultiSelect {
    'focusInput': boolean;
    'options': string[];
    'optionsLength': number;
    'selectedItems': string[];
    'show': boolean;
  }
  interface AppMultiSelectAttributes extends StencilHTMLAttributes {
    'focusInput'?: boolean;
    'onDeleteSelect'?: (event: CustomEvent) => void;
    'onFilterOptions'?: (event: CustomEvent) => void;
    'onInputFocus'?: (event: CustomEvent) => void;
    'onNewSelect'?: (event: CustomEvent) => void;
    'options'?: string[];
    'optionsLength'?: number;
    'selectedItems'?: string[];
    'show'?: boolean;
  }

  interface AppPagination {
    'curPage': number;
    'maxSeq': number;
    'nPage': number;
  }
  interface AppPaginationAttributes extends StencilHTMLAttributes {
    'curPage'?: number;
    'maxSeq'?: number;
    'nPage'?: number;
    'onChangePage'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppArrows': Components.AppArrows;
    'AppBackdrop': Components.AppBackdrop;
    'AppButton': Components.AppButton;
    'AppControl': Components.AppControl;
    'AppInfoTable': Components.AppInfoTable;
    'AppMain': Components.AppMain;
    'AppModal': Components.AppModal;
    'AppMultiSelect': Components.AppMultiSelect;
    'AppPagination': Components.AppPagination;
  }

  interface StencilIntrinsicElements {
    'app-arrows': Components.AppArrowsAttributes;
    'app-backdrop': Components.AppBackdropAttributes;
    'app-button': Components.AppButtonAttributes;
    'app-control': Components.AppControlAttributes;
    'app-info-table': Components.AppInfoTableAttributes;
    'app-main': Components.AppMainAttributes;
    'app-modal': Components.AppModalAttributes;
    'app-multi-select': Components.AppMultiSelectAttributes;
    'app-pagination': Components.AppPaginationAttributes;
  }


  interface HTMLAppArrowsElement extends Components.AppArrows, HTMLStencilElement {}
  var HTMLAppArrowsElement: {
    prototype: HTMLAppArrowsElement;
    new (): HTMLAppArrowsElement;
  };

  interface HTMLAppBackdropElement extends Components.AppBackdrop, HTMLStencilElement {}
  var HTMLAppBackdropElement: {
    prototype: HTMLAppBackdropElement;
    new (): HTMLAppBackdropElement;
  };

  interface HTMLAppButtonElement extends Components.AppButton, HTMLStencilElement {}
  var HTMLAppButtonElement: {
    prototype: HTMLAppButtonElement;
    new (): HTMLAppButtonElement;
  };

  interface HTMLAppControlElement extends Components.AppControl, HTMLStencilElement {}
  var HTMLAppControlElement: {
    prototype: HTMLAppControlElement;
    new (): HTMLAppControlElement;
  };

  interface HTMLAppInfoTableElement extends Components.AppInfoTable, HTMLStencilElement {}
  var HTMLAppInfoTableElement: {
    prototype: HTMLAppInfoTableElement;
    new (): HTMLAppInfoTableElement;
  };

  interface HTMLAppMainElement extends Components.AppMain, HTMLStencilElement {}
  var HTMLAppMainElement: {
    prototype: HTMLAppMainElement;
    new (): HTMLAppMainElement;
  };

  interface HTMLAppModalElement extends Components.AppModal, HTMLStencilElement {}
  var HTMLAppModalElement: {
    prototype: HTMLAppModalElement;
    new (): HTMLAppModalElement;
  };

  interface HTMLAppMultiSelectElement extends Components.AppMultiSelect, HTMLStencilElement {}
  var HTMLAppMultiSelectElement: {
    prototype: HTMLAppMultiSelectElement;
    new (): HTMLAppMultiSelectElement;
  };

  interface HTMLAppPaginationElement extends Components.AppPagination, HTMLStencilElement {}
  var HTMLAppPaginationElement: {
    prototype: HTMLAppPaginationElement;
    new (): HTMLAppPaginationElement;
  };

  interface HTMLElementTagNameMap {
    'app-arrows': HTMLAppArrowsElement
    'app-backdrop': HTMLAppBackdropElement
    'app-button': HTMLAppButtonElement
    'app-control': HTMLAppControlElement
    'app-info-table': HTMLAppInfoTableElement
    'app-main': HTMLAppMainElement
    'app-modal': HTMLAppModalElement
    'app-multi-select': HTMLAppMultiSelectElement
    'app-pagination': HTMLAppPaginationElement
  }

  interface ElementTagNameMap {
    'app-arrows': HTMLAppArrowsElement;
    'app-backdrop': HTMLAppBackdropElement;
    'app-button': HTMLAppButtonElement;
    'app-control': HTMLAppControlElement;
    'app-info-table': HTMLAppInfoTableElement;
    'app-main': HTMLAppMainElement;
    'app-modal': HTMLAppModalElement;
    'app-multi-select': HTMLAppMultiSelectElement;
    'app-pagination': HTMLAppPaginationElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
