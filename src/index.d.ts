type Cart = {
  [key: string]: number;
};

type CartModalProps = {
  handleClose: () => void;
  show: boolean;
};

type CartState = "success" | "loading";

type Discount = {
  minimum: number;
  percentage: number;
};

type Error = {
  message: string;
  statusText: string;
};

type LoaderParams = {
  handle?: string;
};

type Product = {
  description?: string;
  handle: string;
  id: keyof Cart;
  img: string;
  name: string;
  price: number;
};
