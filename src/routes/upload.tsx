import { useEffect, useState, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useQuery, useMutation } from "@apollo/client";
import { getCart, IS_LOGGED_IN } from "../graph/query";
import { ADD_PRODUCT } from "../graph/mutation";

export async function loader(): Promise<Cart> {
  const cart = await getCart();
  return cart;
}

function UploadProduct(): JSX.Element {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const [uploadProduct] = useMutation(ADD_PRODUCT);
  const [uploading, setUploading] = useState<Boolean>(false);
  const [selectedFile, setSelectedFile] = useState({} as any);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
    onDrop: (file) => setSelectedFile(file),
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name} className="list-group-item">
      {file.name} - {file.size} bytes
    </li>
  ));

  const navigate = useNavigate();

  useEffect(() => {
    if (data.isLoggedIn !== true) {
      navigate("/");
    }
  }, [data.isLoggedIn]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error! {error.message}</span>;

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="jsonUpload">
          <Form.Label>Upload JSON File</Form.Label>
          <div {...getRootProps({ className: "dropzone" })}>
            <input className="form-control" {...getInputProps()} />
            <p className="bg-secondary p-5 text-center text-light">
              Drag 'n' drop here, or click to select file
            </p>
          </div>
          <Form.Text className="text-muted">
            Please use this format:
            <pre>
              [&#123; "uuid": Int - Required, "name": String - Required,
              "price": Float - Required, "handle": String - Optional, "img":
              String - URL - Optional, description: String - Optional &#125;]
            </pre>
          </Form.Text>
          <ul className="list-group">{files}</ul>
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => {
            const reader = new FileReader();
            reader.onload = function (e: any) {
              const products = JSON.parse(e.target.result);
              setUploading(true);
              products.map(
                async (product: Product, i: number, products: Product[]) => {
                  let handle, img, description;
                  if (typeof product.handle === "undefined") {
                    handle = encodeURIComponent(product.name);
                  } else {
                    handle = product.handle;
                  }
                  if (typeof product.img === "undefined") {
                    img = `https://loremflickr.com/425/425/motercycle?random=${product.uuid}`;
                  } else {
                    img = product.img;
                  }
                  if (typeof product.description === "undefined") {
                    description =
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lobortis lorem odio, vitae dignissim orci venenatis sed. Vestibulum auctor rutrum nisi nec rutrum. Vivamus id condimentum orci. Sed tristique fringilla lorem, auctor consectetur augue volutpat vel. Maecenas eu metus sodales, luctus enim vitae, accumsan magna. Etiam et viverra mi, vitae efficitur urna. Cras egestas sapien risus, nec blandit nunc tristique vitae. Duis fermentum velit pretium placerat eleifend. Mauris tempus est ut dui euismod, sit amet egestas leo facilisis. Nulla facilisi. Nunc sit amet ante id sem commodo luctus. Integer eu dolor quis orci suscipit ultrices. Morbi velit lectus, accumsan maximus arcu at, rutrum euismod purus";
                  } else {
                    description = product.description;
                  }
                  const uploadProductVariables = {
                    uuid: product.uuid,
                    name: product.name,
                    price: parseFloat(product.price),
                    handle,
                    img,
                    description,
                  };
                  if (i === products.length - 1) {
                    await uploadProduct({
                      variables: uploadProductVariables,
                    }).then(() => {
                      setUploading(false);
                    });
                  } else {
                    await uploadProduct({ variables: uploadProductVariables });
                  }
                }
              );
            };
            reader.readAsText(selectedFile[0]);
          }}
        >
          {uploading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>Upload</>
          )}
        </Button>
      </Form>
    </>
  );
}
export default UploadProduct;
