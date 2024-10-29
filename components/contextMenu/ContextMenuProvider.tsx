import React from "react";
import { Platform } from "react-native";
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
}

export default function ContextMenuProvider({
  title,
  actions,
  children,
}: ContextMenuProviderProps) {
  if (Platform.OS === "web") {
    return WebContextMenuProvider({ title, actions, children });
  } else {
    return MobileContextMenuProvider({ title, actions, children });
  }
}

function WebContextMenuProvider({
  children,
}: ContextMenuProviderProps) {
  return <>{children}</>;
}
