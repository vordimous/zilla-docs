# VS Code extension

The Zilla Visual Studio Code extension enables you to manage your Zilla.yaml config files easily in VS Code.

## Introduction

The VS Code extension includes:

- [Zilla Diagram](#zilla-diagram), which provides a visual representation of your Zilla config similar to a network diagram. It displays all of the configured Zilla elements and how they connect.
- [Yaml IntelliSense](#yaml-intellisense), which helps you write and maintain your [zilla.yaml](../../reference/zilla.yaml/README.md) config.

## Install the VS Code extension

For installation and setup instructions, visit the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=aklivity.zilla-vscode-ext), or search for the official Zilla extension on the Extensions tab in VS Code.

## Zilla Diagram

The extension will render the active zilla yaml file when the `Toggle Diagram View` ![Toggle Diagram View](./toggle.png) button in the top right corner is pressed.

- Clicking anywhere on the diagram will take your cursor to that location in the zilla.yaml file.
- the `?` icon that appears on a clicked element will take you to the appropriate docs page

![](./diagram.png)

- Missing connections and errors can be seen in the diagram view.

![](./diagram_error.png)

- The `Add` dropdown lets you create new elements in the zilla.yaml file.
- The `Export` dropdown lets you download your diagram.
- the View switch will toggle between side-by-side and top-bottom layouts.

![](./diagram_controls.png)

## Yaml IntelliSense

- Property and Value validation highlighting

![](./property_highlight.png)
![](./value_highlight.png)

- Syntax and Context aware autocomplete

![](./syntax_autocomplete.png)
![](./context_autocomplete.png)
