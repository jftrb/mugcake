import { ContextMenuProviderProps } from "@/components/contextMenu/ContextMenuProvider";
import ContextMenu from "react-native-context-menu-view";

export function MobileContextMenuProvider({
  title,
  actions,
  children,
  style,
}: ContextMenuProviderProps) {
  return (
    <ContextMenu
      title={title}
      actions={actions}
      style={style}
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
