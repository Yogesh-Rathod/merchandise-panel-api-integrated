export interface CorporateInterface {
    id: number;
    name: string;
}

export interface CustomerInterface {
    uniqueIdentification: number;
    firstName: string;
    lastName: string;
    dob: string;
    mobileNo: number;
    email: string;
    address: string;
    city: string;
    accrual: string;
    redemption: string;
    balance: string;
    expired: boolean;
}

export interface ProgramInterface {
    id: number;
    name: string;
}

export interface AccrualInterface {
    id: number;
    pointsReceived: string;
    accrualDate: string;
    expiryDate: string;
    maxPartner: string;
    currency: string;
    event: string;
    pointStatus: string;
    pointType: string;
}

export interface TicketInterface {
    ticketId: number;
    ticketPriority: string;
    ticketStatus: string;
    program: string;
    openDate: string;
    closureDate: string;
    category: string;
    description: string;
    ticketChannel: string;
}

export interface CommunicationInterface {
    channel: string;
    contactInfo: string;
    type: string;
    level: string;
    status: string;
    date: string;
    messageId: number;
}
