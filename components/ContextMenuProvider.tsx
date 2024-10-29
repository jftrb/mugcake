import ContextMenu, { ContextMenuAction } from "react-native-context-menu-view";

export interface ContextMenuItem extends ContextMenuAction {
  onPress?: () => void;
}

interface ContextMenuProviderProps {
  /**
   * The title of the menu
   */
  title?: string;
  /**
   * The actions to show the user when the menu is activated
   */
  actions?: ContextMenuItem[];
  children?: React.ReactNode;
}

export default function ContextMenuProvider({
  title,
  actions,
  children,
}: ContextMenuProviderProps) {
  return (
    <ContextMenu
      title={title}
      actions={actions}
      onPress={(e) => {
        const action = actions?.at(e.nativeEvent.index)?.onPress;
        if (action !== undefined) {
          action();
        }
      }}
    >
      {children}
    </ContextMenu>
  );
}
