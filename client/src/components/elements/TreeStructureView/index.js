import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import print from "../../../workWithFiles/readFiles";

async function printArray(path) {
  try {
    const array = await print(path);
    console.log(array);

    return array;
  } catch (e) {
    console.log(e);
  }
}

const sample = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TreeStructureView() {
  const classes = useStyles();

  const [data, setData] = useState({});
  const path = "C://";

  // TODO: Move it to the server side. Get only array. All work should be implemented in the server side
  const printSomething = async () => {
    // const array = await printArray(path);
    // console.log(array);
    setData(sample);
  };

  useEffect(() => {
    printSomething();
  }, []);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
