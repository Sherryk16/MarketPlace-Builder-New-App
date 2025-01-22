export default {
    name: "shipment",
    type: "document",
    title: "Shipment",
    fields: [
      {
        name: "orderId",
        type: "string",
        title: "Order ID",
      },
      {
        name: "carrier",
        type: "string",
        title: "Carrier",
        options: {
          list: ["FedEx", "DHL", "UPS", "USPS"],
        },
      },
      {
        name: "trackingNumber",
        type: "string",
        title: "Tracking Number",
      },
      {
        name: "status",
        type: "string",
        title: "Status",
        options: {
          list: ["Pending", "Shipped", "In Transit", "Delivered"],
        },
        initialValue: "Pending",
      },
      {
        name: "estimatedDeliveryDate",
        type: "datetime",
        title: "Estimated Delivery Date",
      },
      {
        name: "currentLocation",
        type: "string",
        title: "Current Location",
      },
      {
        name: "updates",
        type: "array",
        title: "Tracking Updates",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "date",
                type: "datetime",
                title: "Date",
              },
              {
                name: "location",
                type: "string",
                title: "Location",
              },
              {
                name: "status",
                type: "string",
                title: "Status",
              },
            ],
          },
        ],
      },
    ],
  };
  