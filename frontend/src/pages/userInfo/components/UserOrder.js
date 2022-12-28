import { useEffect, useState, forwardRef } from "react";
import { getUserOrder, updateOrderStatus } from "../../../services/api/index";

import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Slide,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Line from "../../../components/Line";
import Footer from "../../../components/Footer";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GuestOrder() {
  const auth = useSelector((state) => state.user.auth);
  const [getState, setGetState] = useState({
    loading: true,
    error: "",
    value: [],
  });
  const [sendState, setSendState] = useState({
    loading: false,
    error: "",
  });
  const [orderStatus, setOrderStatus] = useState({
    status: "",
    order_id: "",
  });
  const [open, setOpen] = useState(false);

  const onCancel = (order_id) => {
    setOpen(true);
    setOrderStatus((prev) => ({ ...prev, order_id: order_id }));
    setSendState((prev) => ({ ...prev, loading: true }));
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (!sendState.loading) {
      return cleanup;
    }

    if (!orderStatus.status)
      updateOrderStatus(orderStatus)
        .then(() => {
          if (!mounted) return;
          sendState({ loading: false, error: "" });
        })
        .catch((error) => {
          if (!mounted) return;
          sendState({ loading: false, error: error?.response?.data?.message });
        });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.loading]);

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (!getState.loading) return cleanup;

    getUserOrder(auth.id)
      .then((res) => {
        if (!mounted) return;
        setGetState((prev) => ({ ...prev, loading: false, value: res.data }));
        setOrderStatus({
          status: "",
          order_id: "",
        });
        setOpen(false);
      })
      .catch((error) => {
        if (!mounted) return;
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message,
        }));
      });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading]);

  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
      </div>
      <Banner />
      <div className="w-full flex justify-center bg-primary-grey">
        <div className="flex flex-col gap-6 w-1000 relative -top-12 rounded">
          <div className="rounded bg-white w-full p-6">
            <p className=" mb-10 font-bold text-3xl">Your order</p>
            <div className="flex gap-4 flex-col">
              {getState.value.map((item) => {
                const product = item.product;
                return (
                  <div className="flex gap-2 w-full" key={item.order_id}>
                    <img
                      src={product.product_image}
                      className="object-cover aspect-image w-40 rounded-lg"
                      alt="product_image"
                    />
                    <div className="p-1 text-sm">
                      <p className=" text-lg font-medium">
                        {product.product_name}
                      </p>
                      <div className="flex gap-2 items-end">
                        <p>Price: {product.product_price}</p>
                        <p>Quantity: {item.cart_quantity}</p>
                        <p>
                          Total price:{"  "}
                          <span>
                            {product.product_price * item.cart_quantity} $
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>Status: {item.status}</p>
                        <p>Receiver: {item.buyer_name}</p>
                        <p>
                          Delivery address:{" "}
                          {item.buyer_address_street +
                            ", " +
                            item.buyer_address_district +
                            ", " +
                            item.buyer_address_prefecture}
                        </p>
                        <p>Phone number: {item.buyer_phone}</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => onCancel(item.order_id)}
                      >
                        cancel
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog
        TransitionComponent={Transition}
        transitionDuration={300}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <div className="!p-6">
          <form onSubmit={onCancel}>
            <FormControl className="!w-full">
              <p className="font-medium text-lg mb-6">
                Reason for order cancellation
              </p>

              <Line />

              <RadioGroup
                value={orderStatus.status}
                onChange={(e) =>
                  setOrderStatus((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <FormControlLabel
                  control={<Radio value={"Change delivery location"} />}
                  label="Change delivery location"
                />

                <Line />

                <FormControlLabel
                  control={<Radio value={"I found the product cheaper"} />}
                  label="I found the product cheaper"
                />

                <Line />

                <FormControlLabel
                  control={
                    <Radio value={"I don't like this product anymore"} />
                  }
                  label="I don't like this product anymore"
                />
                <Line />

                <FormControlLabel
                  control={<Radio value={"Edit order quantity"} />}
                  label="Edit order quantity"
                />
              </RadioGroup>

              <Line />

              <div className="flex justify-end py-2">
                <Button variant="contained" type="submit">
                  submit
                </Button>
              </div>
            </FormControl>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
