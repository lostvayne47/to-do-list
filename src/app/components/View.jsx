import React, { useContext } from "react";
import { List, ListItem } from "@mui/material";
import Item from "@/app/components/Item";
import { DataContext } from "@/DataContext";
export default function View() {
  const { data } = useContext(DataContext);
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //Replace dummy with data
  return (
    <div style={{ width: "100%", border: "1px solid white" }}>
      {data && data.length != 0 ? (
        <List sx={{ paddingLeft: 2 }}>
          {data.map((item) => (
            <ListItem
              key={item.id}
              sx={{ listStyleType: "disc", paddingLeft: 2 }}
            >
              <Item id={item.id} itemData={item} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div>Add an item to the list</div>
      )}
    </div>
  );
}
