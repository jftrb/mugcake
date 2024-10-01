import alert from "@/libraries/alert";
import { NavigationProp } from "@react-navigation/native";
import { BackHandler } from "react-native";

interface PlatformBackHandler {
  setupBackHandler(): () => void;
}

export class MobileBackHandler implements PlatformBackHandler {
  private isFormDirty: () => boolean;
  private onForceExit: () => void;

  constructor(isFormDirty: () => boolean, onForceExit: () => void) {
    this.isFormDirty = isFormDirty;
    this.onForceExit = onForceExit;
  }

  public setupBackHandler(): () => void {
    console.log("Adding listener on 'hardwareBackPress'.");
    const listener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => this.onHardwareBackPress()
    );

    return () => {
      console.log("Removing listener on 'hardwareBackPress' at end of effect.");
      listener.remove();
    };
  }

  private onHardwareBackPress(): boolean {
    if (this.isFormDirty()) {
      confirmUnsavedChangesAlert({
        onCancel: () => {},
        onDiscard: () => {
          this.onForceExit();
        },
        onDismiss: () => {},
      });

      return true;
    }

    return false;
  }
}

export class WebBackHandler implements PlatformBackHandler {
  private navigation: NavigationProp<ReactNavigation.RootParamList>;
  private isFormDity: () => boolean;
  private areChangesSaved: () => boolean;

  constructor(
    navigation: NavigationProp<ReactNavigation.RootParamList>,
    isFormDity: () => boolean,
    areChangesSaved: () => boolean
  ) {
    this.navigation = navigation;
    this.isFormDity = isFormDity;
    this.areChangesSaved = areChangesSaved
  }

  public setupBackHandler(): () => void {
    console.log("Adding listener on 'beforeRemove'.");

    const onBeforeRemove = (e: any) => {
      if (!this.shouldExit()) {
        e.preventDefault();
        console.log("should prevent");
      }
    };

    this.navigation.addListener("beforeRemove", onBeforeRemove);

    return () => {
      console.log("Removing listener on 'beforeRemove' at end of effect.");
      this.navigation.removeListener("beforeRemove", onBeforeRemove);
    };
  }

  private shouldExit(): boolean {
    let shouldExit = true;

    if (this.isFormDity() && !this.areChangesSaved()) {
      confirmUnsavedChangesAlert({
        onCancel: () => (shouldExit = false),
        onDiscard: () => {},
        onDismiss: () => (shouldExit = false),
      });
    }

    return shouldExit;
  }
}

function confirmUnsavedChangesAlert({
  onCancel,
  onDiscard,
  onDismiss,
}: {
  onCancel: () => void;
  onDiscard: () => void;
  onDismiss: () => void;
}) {
  alert(
    "Unsaved Changes",
    "It looks like you have unsaved changes. Are you sure you wish to leave this page without saving?",
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("Cancel Pressed");
          onCancel();
        },
      },
      {
        text: "Discard",
        onPress: () => {
          console.log("Discard Pressed");
          onDiscard();
        },
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {
        console.log(
          "This alert was dismissed by tapping outside of the alert dialog."
        );
        onDismiss();
      },
    }
  );
  console.log("closed alert pop up");
}
