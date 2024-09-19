interface IMenuItem {
  icon: JSX.Element
  title: string
  to?: string
  items?: IMenuItem[]
}

const Menu = (userInfo: {
  role: string
  permission: { navigation_bar: any[] }
}): IMenuItem[] => {
  // console.log(userInfo?.permission?.navigation_bar)
  // Helper function to create a menu item
  const createMenuItem = (item: any): IMenuItem => ({
    icon: (
      <img
        src={item.icon}
        alt={item.title}
        style={{ width: '24px', height: '24px' }}
      />
    ),
    title: item.title,
    to: item.path,
    items: item.subItems ? item.subItems.map(createMenuItem) : [],
  })

  // Map userInfo navigation_bar to menu items
  const menu = userInfo?.permission?.navigation_bar?.map(createMenuItem)

  return menu
}

export default Menu




