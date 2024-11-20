import { PageEnum } from '@src/enums/pageEnum';

/**
 * Recursive assembly menu format
 */
export function generatorMenu(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item);
    const info = isRoot ? item : item;
    const currentMenu: any = {
      label: item.meta?.title,
      to: item.path,
      icon: item.meta?.icon
    };

    // Recursively handle children, if they exist
    if (info.children && info.children.length > 0) {
      currentMenu.items = generatorMenu(info.children);
    }

    return currentMenu;
  });
}

// export function generatorMenu(routerMap: Array<any>) {
//   return filterRouter(routerMap).map((item) => {
//     console.log(item);
//     const isRoot = isRootRouter(item);
//     const info = isRoot ? item : item;
//     const currentMenu: any = {
//       ...info,
//       ...info.meta,
//       label: item.meta?.title,
//       key: item.path,
//       icon: isRoot ? item.meta?.icon : info.meta?.icon
//     };
//     // Whether there is a submenu and process it recursively
//     if (info.children && info.children.length > 0) {
//       // Recursion
//       currentMenu.items = generatorMenu(info.children);
//     }
//     return currentMenu;
//   });
// }

/**
 * Determine the root route Router
 * */
function isRootRouter(item: any) {
  return (
    item.meta?.alwaysShow != true &&
    item?.children?.filter((item: any) => !item?.meta?.hidden)?.length === 1
  );
}

/**
 * Exclude Router
 * */
function filterRouter(routerMap: Array<any>) {
  return routerMap.filter((item) => {
    return (
      (item.meta?.hidden || false) != true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    );
  });
}
