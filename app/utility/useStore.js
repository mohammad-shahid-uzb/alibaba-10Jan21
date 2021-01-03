import cartStorage from "./cartStorage";

export default useStore = () => {
  const storeIn = (item) => {
    cartStorage.storeCart(item);
  };
  return {  storeIn };
};
