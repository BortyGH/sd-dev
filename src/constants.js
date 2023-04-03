import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 6 });

export const serviceTypes = [
  {
    label: "Airfreight",
    value: "airfreight",
  },
  {
    label: "OBC",
    value: "obc",
  },
  {
    label: "DRF",
    value: "drf",
  },
  {
    label: "Charter",
    value: "charter",
  },
];

export const statusTypes = [
  {
    label: "Not started",
    value: "not-started",
  },

  {
    label: "On time",
    value: "on-time",
  },

  {
    label: "Delayed",
    value: "delayed",
  },
  {
    label: "Done",
    value: "done",
  },
];

export const initialPackage = () => ({
  id: uid(),
  packageNumber: "",
  itemCount: "",
  weight: "",
  packaging: "",
  goodsType: "",
  stackable: false,
  dimensions: "",
  status: "",
  sectionEnabled: true,
  reasonOfDelay: "",
  quantity: "",
});

export const initialFlight = () => ({
  id: uid(),
  actualTime: null,
  estimatedTime: null,
  departureAirport: "",
  arrivalAirport: "",
  flightNumber: "",
  status: "not-started",
  sectionEnabled: true,
  reasonOfDelay: "",
  enabledETD: true,
  enabledETA: true,
  files: [],
});

export const initialWB = () => ({
  id: uid(),
  name: "",
  note: "",
  completed: false,
  packages: [initialPackage()],
  shipmentConfirm: {
    contacted: false,
    capacityBooked: false,
    documents: [],
    itinerary: [],
    passport: [],
    status: "not-started",
    confirmationDate: null,
    clientReference: "",
    sectionEnabled: true,
    reasonOfDelay: "",
    courierName: "",
    courierPhone: "",
    currierReserved: false,
    klicEnabled: true,
  },
  pickedUp: {
    actualTime: null,
    estimatedTime: null,
    exportCustoms: false,
    goodsTendered: false,
    status: "not-started",
    reasonOfDelay: "",
    sectionEnabled: true,
    plateNumber: "",
    driversName: "",
    enabledETA: true,
    enabledGoodsCollected: true,
  },
  flightDeparture: {
    sectionEnabled: true,
    flights: [initialFlight()],
  },
  flightArrival: {
    airlineNotification: false,
    importCustoms: [],
    actualTime: null,
    estimatedTime: null,
    status: "not-started",
    sectionEnabled: true,
    reasonOfDelay: "",
    enabledImports: true,
  },
  goodsRetrieved: {
    eta: "",
    handedToDriver: false,
    status: "not-started",
    sectionEnabled: true,
    reasonOfDelay: "",
    plateNumber: "",
    driversName: "",
  },
  goodsPickedUp: {
    actualTime: null,
    estimatedTime: null,
    status: "not-started",
    sectionEnabled: true,
    reasonOfDelay: "",
  },
  goodsDelivered: {
    actualTime: null,
    estimatedTime: null,
    status: "not-started",
    reasonOfDelay: "",
    pod: [],
    sectionEnabled: true,
    documents: [],
    delivered: "",
  },
  goodsHanded: {
    goodsHanded: false,
    status: "not-started",
    sectionEnabled: true,
    reasonOfDelay: "",
  },
});

export const initialShipment = () => ({
  sdlId: "",
  type: "airfreight",
  subscribedEmails: [],
  wayBills: [initialWB()],
});
