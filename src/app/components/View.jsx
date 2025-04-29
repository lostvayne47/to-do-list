import React, { useContext } from "react";
import { List, ListItem } from "@mui/material";
import Item from "@/app/components/Item";
import { DataContext } from "@/DataContext";
export default function View() {
  const { data } = useContext(DataContext);
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //Replace dummy with data
  return (
    <div style={{ border: "1px solid white", padding: "16px" }}>
      {dummy && dummy.length != 0 ? (
        <List sx={{ paddingLeft: 2 }}>
          {dummy.map((n) => (
            <ListItem key={n} sx={{ listStyleType: "disc", paddingLeft: 2 }}>
              <Item id={n} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div>Add an item to the list</div>
      )}
    </div>
  );
}
