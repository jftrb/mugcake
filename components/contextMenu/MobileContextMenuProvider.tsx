import { ContextMenuProviderProps } from "@/components/contextMenu/ContextMenuProvider";
import ContextMenu from "react-native-context-menu-view";

export function MobileContextMenuProvider({
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
