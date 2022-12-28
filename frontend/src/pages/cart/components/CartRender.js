import { useEffect, useState } from "react";
import {
  getUserCart,
  deleteCart,
  updateCartQuantity,
} from "../../../services/api/index";
import { useSelector } from "react-redux";
import UseGetSearchParams from "../../../ultis/queryParams";

import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  FormControlLabel,
  ButtonGroup,
  TextField,
  FormHelperText,
} from "@mui/material";
import AlertDialog from "../../../components/AlertDialog";
import { Link } from "react-router-dom";
import Path from "../../../route/Path";
import {
  getCookieValue,
  setCookie,
  deleteCookieValue,
} from "../../../ultis/cookiesFunc";

export default function CartRender() {
  const [getState, setGetState] = useState({
    loading: true,
    error: "",
    value: {},
  });
  const [sendState, setSendState] = useState({
    loading: false,
    error: "",
  });
  const [selectList, setSelectList] = useState([]);
  const [searchParams, setSearchParams] = UseGetSearchParams();
  const auth = useSelector((state) => state.user.auth);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (cart_id) => {
    setOpen(true);
    setSelectList(cart_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (_, page) => {
    setSearchParams({ ...searchParams, page: page });
    setGetState((prev) => ({ ...prev, loading: true }));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked && getState.value?.user_cart?.length > 0) {
      setSelectList(
        getState.value.user_cart.map((item) => {
          return item.cart_id;
        })
      );
    } else {
      setSelectList([]);
    }
  };
  const handleSelect = (cart_id) => {
    if (selectList.includes(cart_id)) {
      selectList.splice(selectList.indexOf(cart_id), 1);
      setSelectList([...selectList]);
    } else {
      selectList.push(cart_id);
      setSelectList([...selectList]);
    }
  };

  const handleChangeRowsPerPage = (e) => {
    setSearchParams({
      page: 0,
      rows_per_page: Number(e.target.value),
    });
    setGetState((prev) => ({ ...prev, loading: true }));
  };

  const onDelete = () => {
    if (!auth) {
      const new_user_cart = deleteCookieValue(selectList);
      setGetState((prev) => ({
        ...prev,
        value: { ...prev.value, user_cart: new_user_cart },
      }));
      setSelectList([]);
      handleClose();
      return;
    }
    deleteCart(selectList.join("&cart_id="))
      .then(() => {
        setGetState((prev) => ({ ...prev, loading: true }));
        setOpen(false);
      })
      .catch((error) => {
        setSendState((prev) => ({
          ...prev,
          error: error?.response?.data?.message,
        }));
      });
  };

  const handleIncrement = (
    cart_index,
    cart_quantity,
    cart_id,
    product_quantity
  ) => {
    if (!auth) {
      const new_user_cart = getState.value.user_cart.map((item, index) => {
        if (index === cart_index) {
          let cart_quantity = item.cart_quantity + 1;
          let quantity_error = false;
          if (cart_quantity > product_quantity) {
            cart_quantity = cart_quantity - 1;
            quantity_error = true;
          }
          return {
            ...item,
            quantity_error: quantity_error,
            cart_quantity: cart_quantity,
          };
        }
        return item;
      });
      setGetState((prev) => ({
        ...prev,
        value: {
          ...prev.value,
          user_cart: new_user_cart,
        },
      }));
      setCookie("cart", new_user_cart, 2);
      return;
    }
    if (cart_quantity >= product_quantity) {
      return setGetState((prev) => ({
        ...prev,
        value: {
          ...prev.value,
          user_cart: getState.value.user_cart.map((item, index) => {
            if (index === cart_index) {
              return { ...item, quantity_error: true };
            }
            return item;
          }),
        },
      }));
    }

    updateCartQuantity(cart_id, cart_quantity + 1)
      .then(() => {
        setGetState((prev) => ({
          ...prev,
          value: {
            ...prev.value,
            user_cart: getState.value.user_cart.map((item, index) => {
              if (index === cart_index) {
                return { ...item, cart_quantity: item.cart_quantity + 1 };
              }
              return item;
            }),
          },
        }));
      })
      .catch((error) => {
        sendState((prev) => ({
          ...prev,
          error: error?.response?.data?.message,
        }));
      });
  };

  const handleDecrement = (
    cart_index,
    cart_quantity,
    cart_id,
    product_quantity
  ) => {
    if (cart_quantity === 1) {
      return handleClickOpen([cart_id]);
    }
    if (!auth) {
      const new_user_cart = getState.value.user_cart.map((item, index) => {
        if (index === cart_index) {
          return {
            ...item,
            cart_quantity: item.cart_quantity - 1,
            quantity_error: false,
          };
        }
        return item;
      });
      setGetState((prev) => ({
        ...prev,
        value: {
          ...prev.value,
          user_cart: new_user_cart,
        },
      }));
      setCookie("cart", new_user_cart, 2);
      return;
    }

    if (cart_quantity > 1 && cart_quantity <= product_quantity) {
      updateCartQuantity(cart_id, cart_quantity - 1)
        .then(() => {
          setGetState((prev) => ({
            ...prev,
            value: {
              ...prev.value,
              user_cart: getState.value.user_cart.map((item, index) => {
                if (index === cart_index) {
                  return {
                    ...item,
                    cart_quantity: item.cart_quantity - 1,
                    quantity_error: false,
                  };
                }
                return item;
              }),
            },
          }));
        })
        .catch((error) => {
          sendState((prev) => ({
            ...prev,
            error: error?.response?.data?.message,
          }));
        });
    }
  };

  const totalPrice = () => {
    if (!getState.loading) {
      return getState.value.user_cart.reduce((acc, curr) => {
        if (selectList.includes(curr.cart_id)) {
          return acc + curr.product_price * curr.cart_quantity;
        }
        return acc;
      }, 0);
    }
    return 0;
  };
  
  const checkOutList = () => {
    const checkOutList = [];
    if (getState.value?.user_cart) {
      for (let item of getState.value?.user_cart) {
        if (selectList.includes(item.cart_id)) {
          checkOutList.push(item);
        }
      }
    }
    return checkOutList;
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!getState.loading) {
      return cleanup;
    }

    if (!auth) {
      const user_cart = getCookieValue("cart");
      return setGetState({
        loading: false,
        error: "",
        value: {
          user_cart: user_cart || [],
          total_rows: user_cart?.length || 0,
          rowsPerPage: 5,
        },
      });
    }

    getUserCart(auth?.id, searchParams.page, searchParams.rows_per_page)
      .then((res) => {
        if (!mounted) {
          return;
        }
        const data = {
          ...res.data,
          user_cart: res.data.user_cart.map((item) => ({
            ...item,
            quantity_error: false,
          })),
        };
        setGetState({
          loading: false,
          error: "",
          value: data,
        });
      })
      .catch((error) => {
        if (!mounted) {
          return;
        }
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message,
        }));
      });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading, selectList.length]);

  return (
    <div className="flex flex-col gap-6 w-1200 relative -top-12 rounded">
      <div className="rounded bg-white w-full p-6">
        <p className="mb-10 font-bold text-3xl">Shopping cart</p>
        <div>
          {getState.loading ? (
            <div className="w-full flex justify-center py-6">
              <CircularProgress className="!text-primary-pink" size={80} />
            </div>
          ) : (
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width="5%">
                        <Checkbox
                          checked={
                            selectList.length ===
                              getState.value?.user_cart?.length &&
                            getState.value?.user_cart?.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell width="40%">Product</TableCell>
                      <TableCell width="10%" align="center">
                        Unit Price
                      </TableCell>
                      <TableCell width="25%" align="center">
                        Quantity
                      </TableCell>
                      <TableCell width="10%" align="center">
                        Total Price
                      </TableCell>
                      <TableCell width="10%" align="center">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getState.value.user_cart.map((item, index) => {
                      return (
                        <TableRow key={item.cart_id}>
                          <TableCell>
                            <Checkbox
                              checked={selectList.includes(item.cart_id)}
                              onChange={() => handleSelect(item.cart_id)}
                            />
                          </TableCell>
                          <TableCell className="!flex items-center gap-3">
                            <img
                              className=" w-20 object-cover aspect-image rounded-lg"
                              src={item.product_image}
                              alt="product_image"
                            />
                            <p>{item.product_name}</p>
                          </TableCell>
                          <TableCell align="center">
                            {item.product_price}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup
                              size="small"
                              aria-label="small outlined button group"
                            >
                              <Button
                                onClick={() =>
                                  handleIncrement(
                                    index,
                                    item.cart_quantity,
                                    item.cart_id,
                                    item.product_quantity
                                  )
                                }
                              >
                                +
                              </Button>{" "}
                              <TextField
                                size="small"
                                value={item.cart_quantity}
                                className="w-10"
                              />
                              <Button
                                onClick={() =>
                                  handleDecrement(
                                    index,
                                    item.cart_quantity,
                                    item.cart_id,
                                    item.product_quantity
                                  )
                                }
                              >
                                -
                              </Button>
                            </ButtonGroup>
                            {item.quantity_error && (
                              <FormHelperText
                                error={true}
                                className="!text-center"
                              >
                                This product only has {item.product_quantity}{" "}
                                left
                              </FormHelperText>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {item.product_price * item.cart_quantity}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => handleClickOpen([item.cart_id])}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                className="!w-full !border-none !flex !justify-end"
                count={getState.value.total_rows}
                page={Number(searchParams.page) || 0}
                rowsPerPage={Number(searchParams.rows_per_page) || 5}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          )}
        </div>
      </div>
      <div className="rounded bg-white w-full px-6 sticky bottom-0 border-[1px] border-primary-pink">
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell className="!border-none p-0 flex" width="20%">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        selectList?.length ===
                          getState.value?.user_cart?.length &&
                        getState.value?.user_cart?.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  }
                  label={`Select All (${getState.value?.user_cart?.length})`}
                  labelPlacement="end"
                />
              </TableCell>
              <TableCell className="!border-none p-0" width="40%">
                <Button
                  variant="contained"
                  onClick={() => handleClickOpen(selectList)}
                >
                  delete
                </Button>
              </TableCell>
              <TableCell width="20%" align="right">
                <span>{`Total (${selectList.length}) item: `}</span>
                <span>{totalPrice()} $</span>
              </TableCell>
              <TableCell width="20%" align="right">
                <Button variant="contained">
                  <Link
                    to={
                      Path.checkOut +
                      `?selectList=${JSON.stringify(checkOutList())}`
                    }
                  >
                    check out
                  </Link>
                </Button>
              </TableCell>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <AlertDialog handleClose={handleClose} open={open} onDelete={onDelete} />
    </div>
  );
}
