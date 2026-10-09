import React, { createContext, useContext, useState } from 'react';

export type BookingServiceType = 'recording' | 'piano' | 'vocal' | 'guitar' | 'producer' | 'mixmaster';

interface BookingModalContextType {
  isOpen: boolean;
  activeService: BookingServiceType | null;
  openBooking: (service?: BookingServiceType) => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<BookingServiceType | null>(null);

  const openBooking = (service?: BookingServiceType) => {
    setActiveService(service || null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setActiveService(null);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, activeService, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = (): BookingModalContextType => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
};
