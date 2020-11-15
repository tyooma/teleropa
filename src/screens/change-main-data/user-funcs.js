export const getScreenTitle = (ScreenID) => {
  switch (ScreenID) {
    case 'RegistrationUser': return 'Registrieren'; // Registrieren / Anmeldung
    case 'ChangeUserInfo': return 'Persönliche Angaben';
    case 'ChangeUserBillingAddress': return 'Rechnungsadresse';
    case 'ChangeUserShippingAddress': return 'Versandadresse';
    default: return ScreenID;
  }
}
