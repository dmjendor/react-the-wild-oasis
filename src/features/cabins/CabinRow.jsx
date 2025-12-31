import styled from "styled-components";
import {
  HiOutlineDocumentDuplicate,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Dash = styled.span`
  margin: 0 auto;
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    description,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isWorking = isDeleting || isCreating;
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      description,
      discount,
      image,
    });
  }
  return (
    <Table.Row role="row">
      <div>
        <img src={image} />
      </div>
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <Dash>&mdash;</Dash>
      )}
      <div>
        <Button
          size="small"
          onClick={handleDuplicate}
          disabled={isWorking}
        >
          <HiOutlineDocumentDuplicate />
        </Button>

        <Modal>
          <Modal.Open opens="edit">
            <Button
              size="small"
              disabled={isWorking}
            >
              <HiOutlinePencilSquare />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal>
            <Modal.Open opens="delete">
              <Button
                size="small"
                variation="danger"
                disabled={isWorking}
              >
                <HiOutlineTrash />
              </Button>
            </Modal.Open>
            f
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isWorking}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
