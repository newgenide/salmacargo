interface IPackage{
    trackingID: string;
    senderName: string;
    senderEmail?: string;
    senderPhone?: string;
    originAddress: string;
    receiverName: string;
    receiverEmail?: string;
    receiverPhone?: string;
    destinationAddress: string;
    expectedDeliveryDate: Date;
    weight: string;
    freight: 'air' | 'land' | 'sea';
    description?: string;
    status: 'pending' | 'processing' | 'in transit' | 'delivered' | 'cancelled';
    charges: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IShipmentHistory{
    trackingID: string;
    status: 'pending' | 'processing' | 'in transit' | 'delivered' | 'cancelled';
    notes?: string;
    currentLocation: string,
    createdAt: Date;
}

interface Site{
    siteName: string,
    phone: string,
    email: string,
    address: string
}

interface User{
    email: string,
    username: string,
    password: string
}