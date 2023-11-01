import React, { useState, useRef } from "react";
import { DetailsList, Selection, SelectionMode } from "@fluentui/react";

const data = Array.from(Array(500).keys()).map((item) => ({
  key: item,
  name: `Item ${item}`,
}));

export default function App() {
  const [, setRefresh] = useState(true);
  const [selection] = useState(
    new Selection({
      onSelectionChanged: () => _onSelectionChanged(),
    }),
  );

  const selectedKeys = useRef([]);

  const _onSelectionChanged = () => {
    const previousSelectedKeys = selectedKeys.current;
    const keysInSelection = selection.getItems().map(({ key }) => key);
    const currentSelectedKeys = selection.getSelection().map(({ key }) => key);

    const newSelectedKeys = [
      ...currentSelectedKeys,
      ...previousSelectedKeys.filter(
        (
          key,
        ) =>
          !keysInSelection.includes(key) ||
          (keysInSelection.includes(key) && currentSelectedKeys.includes(key)),
      ),
    ];
    const newUniqueKeys = [...new Set(newSelectedKeys)];

    selectedKeys.current = newUniqueKeys;
    setRefresh((prevValue) => !prevValue);
  };

  return (
    <>
      <DetailsList
        setKey="multiple"
        items={data}
        selectionMode={SelectionMode.multiple}
        selectionPreservedOnEmptyClick
        selection={selection}
        columns={[{ key: "name", fieldName: "name", name: "Name" }]}
      />
    </>
  );
}