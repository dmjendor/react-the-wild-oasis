import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div>&nbsp;</div>
        <div>Cabin</div>
        <div>Guests</div>
        <div>Price</div>
        <div>Discount</div>
        <div>&nbsp;</div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => (
          <CabinRow
            cabin={cabin}
            key={cabin.id}
          />
        )}
      />
    </Table>
  );
}

export default CabinTable;
