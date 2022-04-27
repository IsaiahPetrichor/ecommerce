import { FC } from 'react';

interface deleteProductProps {
	setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: deleteProductProps;
};

const DeleteProduct: FC<props> = ({ props }) => {
	return <></>;
};

export default DeleteProduct;
