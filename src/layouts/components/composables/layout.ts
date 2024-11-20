import { computed, reactive, readonly } from 'vue';

interface LayoutConfig {
  preset: string;
  primary: string;
  surface: string | null;
  darkTheme: boolean;
  menuMode: string;
}

interface LayoutState {
  isAccountActive: boolean;
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  activeMenuItem: any;
}

const layoutConfig: LayoutConfig = reactive({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  darkTheme: false,
  menuMode: 'static'
});

const layoutState: LayoutState = reactive({
  isAccountActive: false,
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null
});

export function useLayout() {
  const setPrimary = (value: string): void => {
    layoutConfig.primary = value;
  };

  const setSurface = (value: string | null): void => {
    layoutConfig.surface = value;
  };

  const setPreset = (value: string): void => {
    layoutConfig.preset = value;
  };

  const setActiveMenuItem = (item: any): void => {
    layoutState.activeMenuItem = item.value || item;
  };

  const setMenuMode = (mode: string): void => {
    layoutConfig.menuMode = mode;
  };

  const toggleDarkMode = (): void => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();
      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const executeDarkModeToggle = (): void => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle('app-dark');
  };

  const onMenuToggle = (): void => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const onAccountToggle = (): void => {
    layoutState.isAccountActive = !layoutState.isAccountActive;
  };

  const resetMenu = (): void => {
    layoutState.overlayMenuActive = false;
    layoutState.staticMenuMobileActive = false;
    layoutState.menuHoverActive = false;
  };

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return {
    layoutConfig: readonly(layoutConfig),
    layoutState: readonly(layoutState),
    onAccountToggle,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
    setPrimary,
    setSurface,
    setPreset,
    resetMenu,
    setMenuMode
  };
}

// import { computed, reactive, readonly } from 'vue';

// const layoutConfig: any = reactive({
//   preset: 'Aura',
//   primary: 'emerald',
//   surface: null,
//   darkTheme: false,
//   menuMode: 'static'
// });

// const layoutState: any = reactive({
//   staticMenuDesktopInactive: false,
//   overlayMenuActive: false,
//   profileSidebarVisible: false,
//   configSidebarVisible: false,
//   staticMenuMobileActive: false,
//   menuHoverActive: false,
//   activeMenuItem: null
// });

// export function useLayout() {
//   const setPrimary = (value: string) => {
//     layoutConfig.primary = value;
//   };

//   const setSurface = (value: string) => {
//     layoutConfig.surface = value;
//   };

//   const setPreset = (value: string) => {
//     layoutConfig.preset = value;
//   };

//   const setActiveMenuItem = (item: any) => {
//     layoutState.activeMenuItem = item.value || item;
//   };

//   const setMenuMode = (mode: string) => {
//     layoutConfig.menuMode = mode;
//   };

//   const toggleDarkMode = () => {
//     if (!document.startViewTransition) {
//       executeDarkModeToggle();

//       return;
//     }

//     document.startViewTransition(() => executeDarkModeToggle());
//   };

//   const executeDarkModeToggle = () => {
//     layoutConfig.darkTheme = !layoutConfig.darkTheme;
//     document.documentElement.classList.toggle('app-dark');
//   };

//   const onMenuToggle = () => {
//     if (layoutConfig.menuMode === 'overlay') {
//       layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
//     }

//     if (window.innerWidth > 991) {
//       layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
//     } else {
//       layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
//     }
//   };

//   const resetMenu = () => {
//     layoutState.overlayMenuActive = false;
//     layoutState.staticMenuMobileActive = false;
//     layoutState.menuHoverActive = false;
//   };

//   const isSidebarActive = computed(
//     () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
//   );

//   const isDarkTheme = computed(() => layoutConfig.darkTheme);

//   const getPrimary = computed(() => layoutConfig.primary);

//   const getSurface = computed(() => layoutConfig.surface);

//   return {
//     layoutConfig: readonly(layoutConfig),
//     layoutState: readonly(layoutState),
//     onMenuToggle,
//     isSidebarActive,
//     isDarkTheme,
//     getPrimary,
//     getSurface,
//     setActiveMenuItem,
//     toggleDarkMode,
//     setPrimary,
//     setSurface,
//     setPreset,
//     resetMenu,
//     setMenuMode
//   };
// }
