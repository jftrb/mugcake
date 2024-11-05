import React from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import { ContextMenuAction } from "react-native-context-menu-view";

let MobileContextMenuProvider = WebContextMenuProvider;

if (Platform.OS !== "web") {
  import("./MobileContextMenuProvider").then((module) => {
    console.log("Imported Mobile Context Menu Provider");
    MobileContextMenuProvider = module.MobileContextMenuProvider;
  });
}

export interface ContextMenuItem extends ContextMenuAction {
  onPress?: () => void;
}

export interface ContextMenuProviderProps {
  /**
   * The title of the menu
   */
  title?: string;
  /**
   * The actions to show the user when the menu is activated
   */
  actions?: ContextMenuItem[];
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

export default function ContextMenuProvider({
  title,
  actions,
  children,
  style,
}: ContextMenuProviderProps) {
  if (Platform.OS === "web") {
    return WebContextMenuProvider({ title, actions, children });
  } else {
    return MobileContextMenuProvider({ title, actions, style, children });
  }
}

function WebContextMenuProvider({
  children,
}: ContextMenuProviderProps) {
  return <>{children}</>;
}
