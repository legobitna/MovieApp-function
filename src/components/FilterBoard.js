import React from "react";
import InputRange from "react-input-range";
import { Dropdown } from "react-bootstrap";
export default function FilterBoard({
  sortByRate,
  sortByPopular,
  filterByYear,
  filterByRate,
  year,
  rating,
}) {
  return (
    <div style={{ width: "100%" }}>
      <Dropdown style={{ width: "100%" }}>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          style={{ width: "100%" }}
        >
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: "100%" }}>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => sortByRate("desc")}
            style={{ width: "100%" }}
          >
            Rating(high -> low)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => sortByRate("asc")}
            style={{ width: "100%" }}
          >
            Rating (low -> hight)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => sortByPopular("desc")}
            style={{ width: "100%" }}
          >
            popularity(high -> low)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => sortByPopular("asc")}
            style={{ width: "100%" }}
          >
            popularity(low -> hight)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ color: "white", width: "100%" }}>
        <p>Year:</p>
        <InputRange
          maxValue={2020}
          minValue={1980}
          value={year}
          onChange={(value) => filterByYear(value)}
        />
      </div>
      <div style={{ color: "white", width: "100%", marginTop: "30px" }}>
        <p>Rating: </p>
        <InputRange
          maxValue={10}
          minValue={0}
          value={rating}
          onChange={(value) => filterByRate(value)}
        />
      </div>
    </div>
  );
}
