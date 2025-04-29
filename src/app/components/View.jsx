import React from "react";
import { List, ListItem } from "@mui/material";
import Item from "@/app/components/Item";
export default function View() {
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div style={{ border: "1px solid white", padding: "16px" }}>
      <List sx={{ paddingLeft: 2 }}>
        {dummy.map((n) => (
          <ListItem key={n} sx={{ listStyleType: "disc", paddingLeft: 2 }}>
            <Item id={n} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
