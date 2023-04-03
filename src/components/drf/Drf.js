import { LoadingPlaceForm } from "../forms/LoadingPlaceForm";
import { ShipmentCollectedForm } from "../forms/ShipmentCollectedForm";
import { UnloadingPlaceForm } from "../forms/UnloadingPlaceForm";
import { TransportForm } from "../forms/TransportForm";
import { GoodsDeliveredForm } from "../forms/GoodsDeliveredForm";

export const Drf = () => {
  return (
    <div>
      <TransportForm />
      <LoadingPlaceForm />
      <ShipmentCollectedForm />
      <UnloadingPlaceForm />
      <GoodsDeliveredForm />
    </div>
  );
};
