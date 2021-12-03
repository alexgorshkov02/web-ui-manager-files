import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_FILES } from "../../utils/queries";

// const sample = {
//   id: "root",
//   name: "Parent",
//   children: [
//     {
//       id: "1",
//       name: "Child - 1",
//     },
//     {
//       id: "3",
//       name: "Child - 3",
//       children: [
//         {
//           id: "4",
//           name: "Child - 4",
//         },
//       ],
//     },
//   ],
// };

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TreeStructureView() {
  const { loading, data, error } = useQuery(QUERY_FILES);
  console.log("testData1", data);

  // console.log("test", files);

  const classes = useStyles();

  // const [data1, setData] = useState({});
  // const path = "C://";

  // const printSomething = async () => {
  //   // const array = await printArray(path);
  //   // console.log(array);

  //   const files = data?.files || [];

  //   const sample = {
  //     id: "root",
  //     path: "Parent",
  //     children: files,
  //   };
  //   console.log("sample: ", sample);
  //   setData(sample);
  // };

  // useEffect(() => {
  //   // console.log("test112222222222222222222222222222: ")
  //   printSomething();
  // }, []);

  const renderItem = (node) => {
    //Temp solution to make different keys and nodeId. As an idea use the path like parentFolder/childFolder as a key and nodeId
    let i=0; 
    return <TreeItem key={node.id} nodeId={node.id} label={node.name}>
    {Array.isArray(node.folders)
      ? node.folders.map((folder) => {
        return <TreeItem key={node.name+i++} nodeId={node.name+i++} label={folder} />
      })
      : null}
      </TreeItem>

    };

  const renderTree = (nodes) =>
    Array.isArray(nodes.files)
      ? nodes.files.map((node) => renderItem(node))
      : null;

  if (loading) return "Loading...";
  if (error) return <div>{error.message}</div>;

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
