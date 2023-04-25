export declare const rootDir = "dist";
export declare const globalDir = "dist/global";
export declare const componentDir = "dist/component";
export declare const typoCss = "typography.css";
export declare const formCss = "form.css";
export declare const componentsCss = "components.css";
export declare const StyleMappings: {
  prioritzedCss: string[];
  baseline: {
    main: string;
    optional: boolean;
  }[];
  components: (
    | {
        component: string;
        main: string;
        dependencies: string[];
      }
    | {
        component: string;
        main: string;
        dependencies?: undefined;
      }
  )[];
};
