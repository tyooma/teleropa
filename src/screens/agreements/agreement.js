import React, {PureComponent} from 'react';
import {Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import NavigationService from '../../navigation-service';

export default class FooterAgreement extends PureComponent {
  static navigationOptions = { title: 'Vereinbarung' };

  render() {
    // const routeName = this.props.navigation.state.routeName;
    const {title} = this.props.navigation.state.params; // title: AGB
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView style={s.Conteiner}>
          <AgreementContent page={title} />
        </ScrollView>
        <ActionBack {...NavigationService} />
      </SafeAreaView>
    );
  }
}

function AgreementContent(props) {
  const title = props.page;
  let content = '';
  switch(title.toUpperCase()) {
    case 'AGB':
      content = (
        <View>
          <Text style={[s.Header, s.B]}>{title}</Text>
          <Text style={[s.P, s.B]}>Allgemeine Geschäftsbedingungen</Text>
          <Text style={[s.P, s.B]}>1. Geltungsbereich</Text>
          <Text style={s.P}>Für alle Bestellungen über unseren Online-Shop durch Verbraucher und Unternehmer gelten die nachfolgenden AGB. Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt. Gegenüber Unternehmern gilt: Verwendet der Unternehmer entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen, wird deren Geltung hiermit widersprochen; sie werden nur dann Vertragsbestandteil, wenn wir dem ausdrücklich zugestimmt haben.</Text>
          <Text style={[s.P, s.B]}>2. Vertragspartner, Vertragsschluss</Text>
          <Text style={s.P}>Der Kaufvertrag kommt zustande mit teleropa GmbH. Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Sie können unsere Produkte zunächst unverbindlich in den Warenkorb legen und Ihre Eingaben vor Absenden Ihrer verbindlichen Bestellung jederzeit korrigieren, indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten Korrekturhilfen nutzen. Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Zugangs Ihrer Bestellung erfolgt per E-Mail unmittelbar nach dem Absenden der Bestellung. Wann der Vertrag mit uns zustande kommt, richtet sich nach der von Ihnen gewählten Zahlungsart:</Text>
          <Text style={[s.P, s.B]}>Nachnahme, Ratenkauf</Text>
          <Text style={s.P}>Wir nehmen Ihre Bestellung durch Versand einer Annahmeerklärung in separater E-Mail oder durch Auslieferung der Ware innerhalb von zwei Tagen an.</Text>
          <Text style={[s.P, s.B]}>Vorkasse</Text>
          <Text style={s.P}>Wir nehmen Ihre Bestellung durch Versand einer Annahmeerklärung in separater E-Mail innerhalb von zwei Tagen an, in welcher wir Ihnen unsere Bankverbindung nennen.</Text>
          <Text style={[s.P, s.B]}>PayPal</Text>
          <Text style={s.P}>Im Bestellprozess werden Sie auf die Webseite des Online-Anbieters PayPal weitergeleitet. Dort können Sie Ihre Zahlungsdaten angeben und die Zahlungsanweisung an PayPal bestätigen. Nach Abgabe der Bestellung im Shop fordern wir PayPal zur Einleitung der Zahlungstransaktion auf und nehmen dadurch Ihr Angebot an.</Text>
          <Text style={[s.P, s.B]}>PayPal Plus</Text>
          <Text style={s.P}>Im Rahmen des Zahlungsdienstes PayPal Plus bieten wir Ihnen verschiedene Zahlungsmethoden als PayPal Services an. Nach Abgabe der Bestellung werden Sie auf die Webseite des Online-Anbieters PayPal weitergeleitet. Dort können Sie Ihre Zahlungsdaten angeben und die Zahlungsanweisung an PayPal bestätigen. Dadurch kommt der Vertrag mit uns zustande.</Text>
          <Text style={[s.P, s.B]}>Paydirekt</Text>
          <Text style={s.P}>Nach Abgabe der Bestellung werden Sie auf die Webseite des Online-Anbieters paydirekt weitergeleitet, wo Sie die Zahlungsanweisung an paydirekt bestätigen. Nach Abgabe der Bestellung fordern wir paydirekt zur Einleitung der Zahlungstransaktion auf und nehmen dadurch Ihr Angebot an.</Text>
          <Text style={[s.P, s.B]}>Amazon Pay</Text>
          <Text style={s.P}>Im Bestellprozess werden Sie auf die Webseite des Online-Anbieters Amazon noch vor Abschluss des Bestellvorganges in unserem Online-Shop weitergeleitet. Dort können Sie die bei Amazon gespeicherte Lieferadresse und Zahlungsmethode wählen und die Zahlungsanweisung an Amazon bestätigen. Anschließend werden Sie zu unserem Online-Shop zurückgeleitet, wo Sie den Bestellvorgang abschließen können. Nach Abgabe der Bestellung fordern wir Amazon zur Einleitung der Zahlungstransaktion auf und nehmen dadurch Ihr Angebot an.</Text>
          <Text style={[s.P, s.B]}>Barzahlung bei Abholung</Text>
          <Text style={s.P}>Sie zahlen den Rechnungsbetrag bei der Abholung bar.</Text>
          <Text style={[s.P, s.B]}>3. Vertragssprache, Vertragstextspeicherung</Text>
          <Text style={s.P}>Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch. Wir speichern den Vertragstext und senden Ihnen die Bestelldaten und unsere AGB in Textform zu. Der Vertragstext ist aus Sicherheitsgründen nicht mehr über das Internet zugänglich.</Text>
          <Text style={[s.P, s.B]}>4. Lieferbedingungen</Text>
          <Text style={s.P}>Zuzüglich zu den angegebenen Produktpreisen können noch Versandkosten anfallen. Nähere Bestimmungen zu ggf. anfallenden Versandkosten erfahren Sie bei den Angeboten. Sie haben grundsätzlich die Möglichkeit der Abholung bei teleropa GmbH, Trierer Str. 16, 54550 Daun, Deutschland zu den nachfolgend angegebenen Geschäftszeiten: 9:00 - 18:00 Uhr</Text>
          <Text style={[s.P, s.B]}>5. Bezahlung</Text>
          <Text style={s.P}>In unserem Shop stehen Ihnen grundsätzlich die folgenden Zahlungsarten zur Verfügung:</Text>
          <Text style={[s.P, s.B]}>Vorkasse</Text>
          <Text style={s.P}>Bei Auswahl der Zahlungsart Vorkasse nennen wir Ihnen unsere Bankverbindung in separater E-Mail und liefern die Ware nach Zahlungseingang.</Text>
          <Text style={[s.P, s.B]}>Nachnahme</Text>
          <Text style={s.P}>Sie zahlen den Kaufpreis direkt beim Zusteller. Es fallen zzgl. 6,50 Euro als Kosten an.</Text>
          <Text style={[s.P, s.B]}>PayPal</Text>
          <Text style={s.P}>Im Bestellprozess werden Sie auf die Webseite des Online-Anbieters PayPal weitergeleitet. Um den Rechnungsbetrag über PayPal bezahlen zu können, müssen Sie dort registriert sein bzw. sich erst registrieren, mit Ihren Zugangsdaten legitimieren und die Zahlungsanweisung an uns bestätigen. Nach Abgabe der Bestellung im Shop fordern wir PayPal zur Einleitung der Zahlungstransaktion auf. Die Zahlungstransaktion wird durch PayPal unmittelbar danach automatisch durchgeführt. Weitere Hinweise erhalten Sie beim Bestellvorgang.</Text>
          <Text style={[s.P, s.B]}>PayPal Plus</Text>
          <Text style={s.P}>Im Rahmen des Zahlungsdienstes PayPal Plus bieten wir Ihnen verschiedene Zahlungsmethoden als PayPal Services an. Sie werden auf die Webseite des Online-Anbieters PayPal weitergeleitet. Dort können Sie Ihre Zahlungsdaten angeben, die Verwendung Ihrer Daten durch PayPal und die Zahlungsanweisung an PayPal bestätigen.</Text>
          <Text style={s.P}>Wenn Sie die Zahlungsart <Text style={s.B}>Kreditkarte</Text> gewählt haben, müssen Sie, um den Rechnungsbetrag bezahlen zu können, bei PayPal nicht registriert sein. Die Zahlungstransaktion wird unmittelbar nach Bestätigung der Zahlungsanweisung und nach Ihrer Legitimation als rechtmäßiger Karteninhaber von Ihrem Kreditkartenunternehmen auf Aufforderung von PayPal durchgeführt und Ihre Karte belastet. Weitere Hinweise erhalten Sie beim Bestellvorgang.</Text>
          <Text style={s.P}>Wenn Sie die Zahlungsart <Text style={s.B}>Lastschrift</Text> gewählt haben, müssen Sie, um den Rechnungsbetrag bezahlen zu können, bei PayPal nicht registriert sein. Mit Bestätigung der Zahlungsanweisung erteilen Sie PayPal ein Lastschriftmandat. Über das Datum der Kontobelastung werden Sie von PayPal informiert (sog. Prenotification). Unter Einreichung des Lastschriftmandats unmittelbar nach Bestätigung der Zahlungsanweisung fordert PayPal seine Bank zur Einleitung der Zahlungstransaktion auf. Die Zahlungstransaktion wird durchgeführt und Ihr Konto belastet. Weitere Hinweise erhalten Sie beim Bestellvorgang.</Text>
          <Text style={s.P}>Wenn Sie die Zahlungsart <Text style={s.B}>Rechnung</Text> gewählt haben, müssen Sie, um den Rechnungsbetrag bezahlen zu können, bei PayPal nicht registriert sein. Nach erfolgreicher Adress- und Bonitätsprüfung und Abgabe der Bestellung treten wir unsere Forderung an PayPal ab. Sie können in diesem Fall nur an PayPal mit schuldbefreiender Wirkung leisten. Für die Zahlungsabwicklung über PayPal gelten – ergänzend zu unseren AGB – die AGB und die Datenschutzerklärung von PayPal. Weitere Informationen und die vollständigen AGB von PayPal zum Rechnungskauf finden Sie <Link text={'hier'} url={'https://www.paypal.com/de/webapps/mpp/ua/pui-terms'} />.</Text>

          <Text style={[s.P, s.B]}>Paydirekt</Text>
          <Text style={s.P}>Nach Abgabe der Bestellung werden Sie auf die Webseite des Online-Anbieters paydirekt weitergeleitet. Um den Rechnungsbetrag über paydirekt bezahlen zu können, müssen Sie über ein für die Teilnahme an paydirekt freigeschaltetes Online-Banking-Konto verfügen, dort registriert sein bzw. sich erst registrieren, mit Ihren Zugangsdaten legitimieren und die Zahlungsanweisung an uns bestätigen. Unmittelbar nach der Bestellung fordern wir paydirekt zur Einleitung der Zahlungstransaktion auf. Die Zahlungstransaktion wird durch paydirekt automatisch durchgeführt. Weitere Hinweise erhalten Sie beim Bestellvorgang.</Text>
          <Text style={[s.P, s.B]}>Amazon Pay</Text>
          <Text style={s.P}>Im Bestellprozess werden Sie auf die Webseite des Online-Anbieters Amazon noch vor Abschluss des Bestellvorganges in unserem Online-Shop weitergeleitet. Um über Amazon den Bestellprozess abwickeln und den Rechnungsbetrag bezahlen zu können, müssen Sie dort registriert sein bzw. sich erst registrieren und mit Ihren Zugangsdaten legitimieren. Dort können Sie die bei Amazon gespeicherte Lieferadresse und Zahlungsmethode wählen, die Verwendung Ihrer Daten durch Amazon und die Zahlungsanweisung an uns bestätigen. Anschließend werden Sie zu unserem Online-Shop zurückgeleitet, wo Sie den Bestellvorgang abschließen können. Unmittelbar nach der Bestellung fordern wir Amazon zur Einleitung der Zahlungstransaktion auf. Die Zahlungstransaktion wird durch Amazon automatisch durchgeführt. Weitere Hinweise erhalten Sie beim Bestellvorgang.</Text>
          <Text style={[s.P, s.B]}>Ratenkauf</Text>
          <Text style={s.P}>In Zusammenarbeit mit dem Online-Diensteanbieter easyCredit TeamBank AG Nürnberg bieten wir Ihnen die Möglichkeit des Ratenkaufs an. Voraussetzung ist eine erfolgreiche Adress- und Bonitätsprüfung. Für die Zahlungsabwicklung gelten – ergänzend zu unseren AGB – die AGB und die Datenschutzerklärung von easyCredit TeamBank AG Nürnberg. Weitere Informationen und die vollständigen AGB von easyCredit TeamBank AG Nürnberg zum Ratenkauf finden Sie <Link text={'hier'} url={'https://www.easycredit.de/nutzungsbedingungen'}/>.</Text>
          <Text style={[s.P, s.B]}>Barzahlung bei Abholung</Text>
          <Text style={s.P}>Sie zahlen den Rechnungsbetrag bei der Abholung bar.</Text>

          <Text style={[s.P, s.B]}>6. Widerrufsrecht</Text>
          <Text style={s.P}>Verbrauchern steht das gesetzliche Widerrufsrecht, wie in der Widerrufsbelehrung beschrieben, zu. Unternehmern wird kein freiwilliges Widerrufsrecht eingeräumt.</Text>
          <Text style={[s.P, s.B]}>7. Eigentumsvorbehalt</Text>
          <Text style={s.P}>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum. Für Unternehmer gilt ergänzend: Wir behalten uns das Eigentum an der Ware bis zur vollständigen Begleichung aller Forderungen aus einer laufenden Geschäftsbeziehung vor. Sie dürfen die Vorbehaltsware im ordentlichen Geschäftsbetrieb weiterveräußern; sämtliche aus diesem Weiterverkauf entstehenden Forderungen treten Sie – unabhängig von einer Verbindung oder Vermischung der Vorbehaltsware mit einer neuen Sache - in Höhe des Rechnungsbetrages an uns im Voraus ab, und wir nehmen diese Abtretung an. Sie bleiben zur Einziehung der Forderungen ermächtigt, wir dürfen Forderungen jedoch auch selbst einziehen, soweit Sie Ihren Zahlungsverpflichtungen nicht nachkommen.</Text>
          <Text style={[s.P, s.B]}>8. Transportschäden</Text>
          <Text style={s.P}>Für Verbraucher gilt: Werden Waren mit offensichtlichen Transportschäden angeliefert, so reklamieren Sie solche Fehler bitte möglichst sofort beim Zusteller und nehmen Sie bitte unverzüglich Kontakt zu uns auf. Die Versäumung einer Reklamation oder Kontaktaufnahme hat für Ihre gesetzlichen Ansprüche und deren Durchsetzung, insbesondere Ihre Gewährleistungsrechte, keinerlei Konsequenzen. Sie helfen uns aber, unsere eigenen Ansprüche gegenüber dem Frachtführer bzw. der Transportversicherung geltend machen zu können. Für Unternehmer gilt: Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht auf Sie über, sobald wir die Sache dem Spediteur, dem Frachtführer oder der sonst zur Ausführung der Versendung bestimmten Person oder Anstalt ausgeliefert haben. Unter Kaufleuten gilt die in § 377 HGB geregelte Untersuchungs- und Rügepflicht. Unterlassen Sie die dort geregelte Anzeige, so gilt die Ware als genehmigt, es sei denn, dass es sich um einen Mangel handelt, der bei der Untersuchung nicht erkennbar war. Dies gilt nicht, falls wir einen Mangel arglistig verschwiegen haben.</Text>
          <Text style={[s.P, s.B]}>9. Gewährleistung und Garantien</Text>
          <Text style={s.P}>Soweit nicht nachstehend ausdrücklich anders vereinbart, gilt das gesetzliche Mängelhaftungsrecht. Beim Kauf gebrauchter Waren durch Verbraucher gilt: wenn der Mangel nach Ablauf eines Jahres ab Ablieferung der Ware auftritt, sind die Mängelansprüche ausgeschlossen. Mängel, die innerhalb eines Jahres ab Ablieferung der Ware auftreten, können im Rahmen der gesetzlichen Verjährungsfrist von zwei Jahren ab Ablieferung der Ware geltend gemacht werden. Für Unternehmer beträgt die Verjährungsfrist für Mängelansprüche bei neu hergestellten Sachen ein Jahr ab Gefahrübergang. Der Verkauf gebrauchter Waren erfolgt unter Ausschluss jeglicher Gewährleistung. Die gesetzlichen Verjährungsfristen für den Rückgriffsanspruch nach § 445a BGB bleiben unberührt. Gegenüber Unternehmern gelten als Vereinbarung über die Beschaffenheit der Ware nur unsere eigenen Angaben und die Produktbeschreibungen des Herstellers, die in den Vertrag einbezogen wurden; für öffentliche Äußerungen des Herstellers oder sonstige Werbeaussagen übernehmen wir keine Haftung. Ist die gelieferte Sache mangelhaft, leisten wir gegenüber Unternehmern zunächst nach unserer Wahl Gewähr durch Beseitigung des Mangels (Nachbesserung) oder durch Lieferung einer mangelfreien Sache (Ersatzlieferung). Die vorstehenden Einschränkungen und Fristverkürzungen gelten nicht für Ansprüche aufgrund von Schäden, die durch uns, unsere gesetzlichen Vertreter oder Erfüllungsgehilfen verursacht wurden </Text>
          <Text style={s.T}>&#x2713; bei Verletzung des Lebens, des Körpers oder der Gesundheit</Text>
          <Text style={s.T}>&#x2713; bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung sowie Arglist</Text>
          <Text style={s.T}>&#x2713; bei Verletzung wesentlicher Vertragspflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf (Kardinalpflichten)</Text>
          <Text style={s.T}>&#x2713; im Rahmen eines Garantieversprechens, soweit vereinbart</Text>
          <Text style={s.T}>&#x2713; soweit der Anwendungsbereich des Produkthaftungsgesetzes eröffnet ist.</Text>
          <Text style={s.T}>Informationen zu gegebenenfalls geltenden zusätzlichen Garantien und deren genaue Bedingungen finden Sie jeweils beim Produkt und auf besonderen Informationsseiten im Online-Shop.</Text>

          <Text style={[s.P, s.B]}>10. Haftung</Text>
          <Text style={s.P}>Für Ansprüche aufgrund von Schäden, die durch uns, unsere gesetzlichen Vertreter oder Erfüllungsgehilfen verursacht wurden, haften wir stets unbeschränkt</Text>
          <Text style={s.T}>&#x2713; bei Verletzung des Lebens, des Körpers oder der Gesundheit</Text>
          <Text style={s.T}>&#x2713; vorsätzlicher oder grob fahrlässiger Pflichtverletzung</Text>
          <Text style={s.T}>&#x2713; bei Garantieversprechen, soweit vereinbart, oder</Text>
          <Text style={s.T}>&#x2713; soweit der Anwendungsbereich des Produkthaftungsgesetzes eröffnet ist.</Text>
          <Text style={s.P}>Bei Verletzung wesentlicher Vertragspflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf, (Kardinalpflichten) durch leichte Fahrlässigkeit von uns, unseren gesetzlichen Vertretern oder Erfüllungsgehilfen ist die Haftung der Höhe nach auf den bei Vertragsschluss vorhersehbaren Schaden begrenzt, mit dessen Entstehung typischerweise gerechnet werden muss. Im Übrigen sind Ansprüche auf Schadensersatz ausgeschlossen.</Text>
          <Text style={[s.P, s.B]}>11. Streitbeilegung</Text>
          <Text style={s.P}>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie <Link text={'hier'} url={'https://ec.europa.eu/consumers/odr/'}/> finden. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</Text>
          <Text style={[s.P, s.B]}>12. Schlussbestimmungen</Text>
          <Text style={s.P}>Sind Sie Unternehmer, dann gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sind Sie Kaufmann im Sinne des Handelsgesetzbuches, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus Vertragsverhältnissen zwischen uns und Ihnen unser Geschäftssitz.</Text>
          
          <Text style={s.F}>
            <Link text={'AGB'} url={'https://shop.trustedshops.com/de/rechtstexte/'}/>&nbsp;
            erstellt mit dem&nbsp;
            <Link text={'Trusted Shops'} url={'https://shop.trustedshops.com/de/'}/>&nbsp;
            Rechtstexter in Kooperation mit&nbsp;
            <Link text={'Wilde Beuger Solmecke Rechtsanwälte'} url={'https://www.wbs-law.de/'}/>.
          </Text>
        </View>
      );
      break;
    case 'IMPRESSUM':
      content = (
        <View>
          <Text style={s.Header}>{title}</Text>
          <Text style={s.P}>teleropa GmbH</Text>
          <Text style={s.T}>Trierer Str. 16</Text>
          <Text style={s.T}>54550 Daun</Text>
          <Text style={s.T}>Deutschland</Text>
          <Text style={s.P}>Telefon: 06592 98487-0</Text>
          <Text style={s.P}>Fax: 06592 98487-18</Text>
          <Text style={s.P}>E-Mail: info@teleropa.de</Text>
          <Text style={s.P}>Geschäftsführer: <Text style={[s.P, s.B]}>Frank Kirwel</Text></Text>
          <Text style={s.P}>Handelsregister: Amtsgericht Wittlich, HRB 41528</Text>
          <Text style={s.P}>Umsatzsteuer-Identifikationsnummer: DE 274656966</Text>
          <Text style={s.P}>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden <Link text={'https://ec.europa.eu/consumers/odr/'} url={'https://ec.europa.eu/consumers/odr/'}/>. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</Text>
          <Text style={s.P}><Link text={'Impressum'} url={'https://shop.trustedshops.com/de/rechtstexte/'}/> erstellt mit dem <Link text={'Trusted Shops'} url={'https://shop.trustedshops.com/de/'}/> Rechtstexter in Kooperation mit <Link text={'Wilde Beuger Solmecke Rechtsanwälte'} url={'https://www.wbs-law.de/'}/>.</Text>
        </View>
      );
      break;
    case 'DATENSCHUTZ':
      content = (
        <View>
          <Text style={s.Header}>{title}</Text>

          <Text style={[s.P, s.B]}>Datenschutzerklärung</Text>

          <Text style={[s.P, s.B]}>Verantwortlicher für die Datenverarbeitung ist:</Text>
          <Text style={s.T}>teleropa GmbH</Text>
          <Text style={s.T}>Trierer Str. 16</Text>
          <Text style={s.T}>54550</Text>
          <Text style={s.T}>Daun</Text>
          <Text style={s.T}>info@teleropa.de</Text>

          <Text style={s.P}>Wir freuen uns über Ihr Interesse an unserem Online-Shop. Der Schutz Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.</Text>
          
          <Text style={[s.P, s.B]}>1. Zugriffsdaten und Hosting</Text>
          <Text style={s.P}>Sie können unsere Webseiten besuchen, ohne Angaben zu Ihrer Person zu machen. Bei jedem Aufruf einer Webseite speichert der Webserver lediglich automatisch ein sogenanntes Server-Logfile, das z.B. den Namen der angeforderten Datei, Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert. Diese Zugriffsdaten werden ausschließlich zum Zwecke der Sicherstellung eines störungsfreien Betriebs der Seite sowie der Verbesserung unseres Angebots ausgewertet. Dies dient gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer korrekten Darstellung unseres Angebots. Alle Zugriffsdaten werden spätestens sieben Tage nach Ende Ihres Seitenbesuchs gelöscht.</Text>
          <Text style={[s.P, s.B]}>Hostingdienstleistungen durch einen Drittanbieter</Text>
          <Text style={s.P}>Im Rahmen einer Verarbeitung in unserem Auftrag erbringt ein Drittanbieter für uns die Dienste zum Hosting und zur Darstellung der Webseite. Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer korrekten Darstellung unseres Angebots. Alle Daten, die im Rahmen der Nutzung dieser Webseite oder in dafür vorgesehenen Formularen im Onlineshop wie folgend beschrieben erhoben werden, werden auf seinen Servern verarbeitet. Eine Verarbeitung auf anderen Servern findet nur in dem hier erläuterten Rahmen statt. Dieser Dienstleister sitzt innerhalb eines Landes der Europäischen Union oder des Europäischen Wirtschaftsraums.</Text>
          <Text style={[s.P, s.B]}>2. Datenerhebung und -verwendung zur Vertragsabwicklung, Kontaktaufnahme</Text>
          <Text style={s.P}>Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung oder bei einer Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet, da wir in diesen Fällen die Daten zwingend zur Vertragsabwicklung, bzw. zur Bearbeitung Ihrer Kontaktaufnahme benötigen und Sie ohne deren Angabe die Bestellung bzw. die Kontaktaufnahme nicht versenden können. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Wir verwenden die von ihnen mitgeteilten Daten gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO zur Vertragsabwicklung und Bearbeitung Ihrer Anfragen. Soweit Sie hierzu Ihre Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, indem Sie Sich für die Eröffnung eines Kundenkontos entscheiden, verwenden wir Ihre Daten zum Zwecke der Kundenkontoeröffnung. Nach vollständiger Abwicklung des Vertrages oder Löschung Ihres Kundenkontos werden Ihre Daten für die weitere Verarbeitung eingeschränkt und nach Ablauf der steuer- und handelsrechtlichen Aufbewahrungsfristen gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren. Die Löschung Ihres Kundenkontos ist jederzeit möglich und kann entweder durch eine Nachricht an die unten beschriebene Kontaktmöglichkeit oder über eine dafür vorgesehene Funktion im Kundenkonto erfolgen.</Text>
          <Text style={[s.P, s.B]}>3. Datenweitergabe</Text>
          <Text style={s.P}>Zur Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO geben wir Ihre Daten an das mit der Lieferung beauftragte Versandunternehmen weiter, soweit dies zur Lieferung bestellter Waren erforderlich ist. Je nach dem, welchen Zahlungsdienstleister Sie im Bestellprozess auswählen, geben wir zur Abwicklung von Zahlungen die hierfür erhobenen Zahlungsdaten an das mit der Zahlung beauftragte Kreditinstitut und ggf. von uns beauftragte Zahlungsdienstleister weiter bzw. an den ausgewählten Zahlungsdienst. Zum Teil erheben die ausgewählten Zahlungsdienstleister diese Daten auch selbst, soweit Sie dort ein Konto anlegen. In diesem Fall müssen Sie sich im Bestellprozess mit Ihren Zugangsdaten bei dem Zahlungsdienstleister anmelden. Es gilt insoweit die Datenschutzerklärung des jeweiligen Zahlungsdienstleisters.</Text>
          <Text style={s.P}>Zur Bestell- und Vertragsabwicklung setzen wir zudem ein externes Warenwirtschaftssystem ein. Die insoweit stattfindende Datenweitergabe bzw. Verarbeitung basiert auf einer Auftragsverarbeitung.</Text>
          <Text style={s.P}>Entsprechendes gilt für die Datenweitergabe an unsere Hersteller bzw. Großhändler in den Fällen, in denen sie den Versand für uns übernehmen (Streckengeschäft).</Text>

          <Text style={[s.P, s.B]}>Datenweitergabe an Versanddienstleister</Text>
          <Text style={s.P}>Sofern Sie uns hierzu während oder nach Ihrer Bestellung Ihre ausdrückliche Einwilligung erteilt haben, geben wir aufgrund dieser gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO Ihre E-Mail-Adresse und Telefonnummer an den ausgewählten Versanddienstleister weiter, damit dieser vor Zustellung zum Zwecke der Lieferungsankündigung bzw. -abstimmung Kontakt mit Ihnen aufnehmen kann.</Text>
          <Text style={s.P}>Die Einwilligung kann jederzeit durch eine Nachricht an die unten beschriebene Kontaktmöglichkeit oder direkt gegenüber dem Versanddienstleister unter der im Folgenden aufgeführten Kontaktadresse widerrufen werden. Nach Widerruf löschen wir Ihre hierfür angegebenen Daten, soweit Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.</Text>
          <Text style={s.P}>DHL Express Germany GmbH</Text>
          <Text style={s.T}>Heinrich-Brüning-Str. 5</Text>
          <Text style={s.T}>53113</Text>
          <Text style={s.T}>Bonn</Text>
          <Text style={s.T}></Text>
          <Text style={s.T}>General Logistics Systems Germany GmbH & Co. OHG</Text>
          <Text style={s.T}>GLS Germany-Straße 1 - 7</Text>
          <Text style={s.T}>36286</Text>
          <Text style={s.T}>Neuenstein</Text>
          <Text style={s.T}></Text>

          <Text style={[s.P, s.B]}>Datenweitergabe an Inkassounternehmen</Text>
          <Text style={s.P}>Zur Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO geben wir Ihre Daten an ein beauftragtes Inkassounternehmen weiter, soweit unsere Zahlungsforderung trotz vorausgegangener Mahnung nicht beglichen wurde. In diesem Fall wird die Forderung unmittelbar vom Inkassounternehmen eingetrieben. Darüber hinaus dient die Weitergabe der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer effektiven Geltendmachung bzw. Durchsetzung unserer Zahlungsforderung gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO.</Text>
          <Text style={[s.P, s.B]}>Datenweitergabe an WhatsApp</Text>
          <Text style={s.P}>Auf dieser Website wird zudem eine WhatsApp-Schaltfläche (WhatsApp-Share-Button) eingesetzt. Mit dieser Schaltfläche können Sie Inhalte von teleropa.de über die WhatsApp-Applikation auf Ihrem Mobiltelefon teilen. Bei der Schaltfläche handelt es sich um einen Hyperlink. Beim Erscheinen der Schaltfläche auf dieser Internetseite werden noch keine personenbezogenen Daten an den Betreiber von WhatsApp oder anderen Dritten übermittelt. Sobald Sie die WhatsApp-Schaltfläche nutzen, erfährt der Betreiber von WhatsApp, welcher Inhalt geteilt wird und dass die Schaltfläche auf dieser Website benutzt wurde. Mehr Informationen zum Umgang mit personenbezogenen Daten durch den Betreiber von WhatsApp können Sie der Datenschutzerklärung des Betreibers entnehmen: <Link text={'hier'} url={'https://www.whatsapp.com/legal/#Privacy'}/></Text>
          <Text style={[s.P, s.B]}>Datenweitergabe an loopingo</Text>
          <Text style={s.P}>Für unsere Gutscheinangebote verwenden wir die Dienste der loopingo GmbH, Nymphenburgerstr. 12, 80335 München. Zur Vorbereitung des Gutscheins wird von uns die E-Mail-Adresse an loopingo verschlüsselt übermittelt (Rechtsgrundlage hierfür ist Art. 6 Abs.1 b, f DSGVO). Die IP-Adresse, die von loopingo ausschließlich zu Zwecken der Datensicherheit verwendet wird, wird im Regelfall nach sieben Tagen anonymisiert. Außerdem übermitteln wir zur Aufbereitung des Angebots pseudonymisiert Bestellnummer, Bestellwert mit Währung, Postleitzahl, Geschlecht und Zeitstempel an loopingo. Weitere Informationen zur Verarbeitung Ihrer Daten durch loopingo entnehmen Sie bitte den Online-Datenschutzhinweisen unter <Link text={'hier'} url={'www.loopingo.com/datenschutz'}/>.</Text>
          <Text style={s.P}>Datenweitergabe an Tawk.io</Text>
          <Text style={s.P}>Das Onlineangebot bietet die Möglichkeit der Anwendung von Tawk.to. Es handelt sich hierbei um eine Live-Chat- Software. Der Chat ist im Quelltext integriert. Dies wird über ein Skript ermöglicht. Mit der Nutzung des Chats nutzen Sie automatisch die Dienste von Tawk.to. Zu den gesammelten Daten gehören: Chatverlauf, IP-Adresse zum Zeitpunkt des Chats und Herkunftsland. Diese Daten werden nicht an Dritte weitergegeben und dienen ausschließlich zum Schutz und für interne Statistiken. Die Daten dienen nicht der Identifizierung Ihrer Person. Sie werden nicht gespeichert. Die Löschung erfolgt nach dem Chat. Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Tawk.to sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den Datenschutzhinweisen von Tawk.to: <Link text={'hier'} url={'https://www.tawk.to/privacy-policy'}/></Text>
          <Text style={[s.P, s.B]}>4. E-Mail-Newsletter</Text>
          <Text style={[s.P, s.B]}>E-Mail-Werbung mit Anmeldung zum Newsletter</Text>
          <Text style={s.P}>Wenn Sie sich zu unserem Newsletter anmelden, verwenden wir die hierfür erforderlichen oder gesondert von Ihnen mitgeteilten Daten, um Ihnen regelmäßig unseren E-Mail-Newsletter aufgrund Ihrer Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO zuzusenden.</Text>
          <Text style={s.P}>Die Abmeldung vom Newsletter ist jederzeit möglich und kann entweder durch eine Nachricht an die unten beschriebene Kontaktmöglichkeit oder über einen dafür vorgesehenen Link im Newsletter erfolgen. Nach Abmeldung löschen wir Ihre E-Mail-Adresse, soweit Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.</Text>
          <Text style={s.P}>Der Newsletter wird im Rahmen einer Verarbeitung in unserem Auftrag durch einen Dienstleister versendet, an den wir Ihre E-Mail-Adresse hierzu weitergeben.</Text>
          <Text style={s.P}>Dieser Dienstleister sitzt innerhalb eines Landes der Europäischen Union oder des Europäischen Wirtschaftsraums.</Text>

          <Text style={[s.P, s.B]}>5. Datenverwendung bei Zahlungsabwicklung</Text>
          <Text style={[s.P, s.B]}>Ratenkauf</Text>
          <Text style={s.P}>Bei Auswahl der Zahlungsart „Ratenkauf“ sowie Erteilung der hierfür erforderlichen datenschutzrechtlichen Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO werden personenbezogene Daten (Vorname, Nachname, Adresse, Email, Telefonnummer, Geburtsdatum, IP-Adresse, Geschlecht) gemeinsam mit für die Transaktionsabwicklung erforderlichen Daten (Artikel, Rechnungsbetrag, Fälligkeiten, Gesamtbetrag, Rechnungsnummer, Steuern, Währung, Bestelldatum und Bestellzeitpunkt) zu Zwecken der Abwicklung dieser Zahlungsart an unseren Partner easyCredit TeamBank AG Nürnberg, Beuthener Str. 25, 90471 Nürnberg übermittelt.</Text>
          <Text style={s.P}>Zur Überprüfung der Identität bzw. Bonität des Kunden führt unser Partner Abfragen und Auskünfte bei öffentlich zugänglichen Datenbanken sowie Kreditauskunfteien durch. Die Anbieter, bei denen Auskünfte und gegebenenfalls Bonitätsinformationen auf Basis mathematisch-statistischer Verfahren eingeholt werden, sowie weitere Details zur Verarbeitung Ihrer Daten nach Übermittlung an unseren Partner easyCredit TeamBank AG Nürnberg entnehmen Sie bitte dessen Datenschutzerklärung, die Sie hier finden: https://www.easycredit.de/datenschutz. Die erhaltenen Informationen über die statistische Wahrscheinlichkeit eines Zahlungsausfalls verwendet unser Partner easyCredit TeamBank AG Nürnberg für eine abgewogene Entscheidung über die Begründung, Durchführung oder Beendigung des Vertragsverhältnisses. Sie haben die Möglichkeit, mittels Kontaktaufnahme an unseren Partner easyCredit TeamBank AG Nürnberg ihren Standpunkt darzulegen und die Entscheidung anzufechten.</Text>
          <Text style={s.P}>Die im Bestellprozess durch Einwilligung erfolgte Zustimmung zur Datenweitergabe kann jederzeit, auch ohne Angabe von Gründen, uns gegenüber mit Wirkung für die Zukunft widerrufen werden.</Text>

          <Text style={[s.P, s.B]}>6. Integration des Trusted Shops Trustbadge</Text>
          <Text style={s.P}>Zur Anzeige unseres Trusted Shops Gütesiegels und der gegebenenfalls gesammelten Bewertungen sowie zum Angebot der Trusted Shops Produkte für Käufer nach einer Bestellung ist auf dieser Webseite das Trusted Shops Trustbadge eingebunden.</Text>
          <Text style={s.P}>Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer optimalen Vermarktung durch Ermöglichung eines sicheren Einkaufs gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO. Das Trustbadge und die damit beworbenen Dienste sind ein Angebot der Trusted Shops GmbH, Subbelrather Str. 15C, 50823 Köln. Das Trustbadge wird im Rahmen einer Auftragsverarbeitung durch einen CDN-Anbieter (Content-Delivery-Network) zur Verfügung gestellt. Die Trusted Shops GmbH setzt auch Dienstleister aus den USA ein. Ein angemessenes Datenschutzniveau ist sichergestellt. Weitere Informationen zum Datenschutz der Trusted Shops GmbH finden Sie hier.</Text>
          <Text style={s.P}>Bei dem Aufruf des Trustbadge speichert der Webserver automatisch ein sogenanntes Server-Logfile, das auch Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert. Einzelne Zugriffsdaten werden für die Analyse von Sicherheitsauffälligkeiten in einer Sicherheitsdatenbank gespeichert. Die Logfiles werden spätestens 90 Tage nach Erstellung automatisch gelöscht.</Text>
          <Text style={s.P}>Weitere personenbezogene Daten werden an die Trusted Shops GmbH übertragen, wenn Sie sich nach Abschluss einer Bestellung für die Nutzung von Trusted Shops Produkten entscheiden oder sich bereits für die Nutzung registriert haben. Es gilt die zwischen Ihnen und Trusted Shops getroffene vertragliche Vereinbarung. Hierfür erfolgt eine automatische Erhebung personenbezogener Daten aus den Bestelldaten. Ob Sie als Käufer bereits für eine Produktnutzung registriert sind, wird anhand eines neutralen Parameters, der per kryptologischer Einwegfunktion gehashten E-Mail-Adresse, automatisiert überprüft. Die E-Mail Adresse wird vor der Übermittlung in diesen für Trusted Shops nicht zu entschlüsselnden Hash-Wert umgerechnet. Nach Überprüfung auf einen Match, wird der Parameter automatisch gelöscht.</Text>
          <Text style={s.P}>Dies ist für die Erfüllung unserer und Trusted Shops‘ überwiegender berechtigter Interessen an der Erbringung des jeweils an die konkrete Bestellung gekoppelten Käuferschutzes und der transaktionellen Bewertungsleistungen gem. Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich. Weitere Details, auch zum Widerspruch, sind der oben und im Trustbadge verlinkten Trusted Shops Datenschutzerklärung zu entnehmen.</Text>

          <Text style={[s.P, s.B]}>7. Cookies und Webanalyse</Text>
          <Text style={s.T}>Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, um passende Produkte anzuzeigen oder zur Marktforschung verwenden wir auf verschiedenen Seiten sogenannte Cookies. Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer optimierten Darstellung unseres Angebots gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO. Cookies sind kleine Textdateien, die automatisch auf Ihrem Endgerät gespeichert werden. Einige der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung, also nach Schließen Ihres Browsers, wieder gelöscht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf Ihrem Endgerät und ermöglichen uns, Ihren Browser beim nächsten Besuch wiederzuerkennen (persistente Cookies). Die Dauer der Speicherung können Sie der Übersicht in den Cookie-Einstellungen Ihres Webbrowsers entnehmen. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für bestimmte Fälle oder generell ausschließen. Jeder Browser unterscheidet sich in der Art, wie er die Cookie-Einstellungen verwaltet. Diese ist in dem Hilfemenü jedes Browsers beschrieben, welches Ihnen erläutert, wie Sie Ihre Cookie-Einstellungen ändern können. Diese finden Sie für die jeweiligen Browser unter den folgenden Links: <Link text={'Internet Explorer'} url={'https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies'}/>,&nbsp;&nbsp;<Link text={'Safari'} url={'https://support.apple.com/de-de/guide/safari/sfri11471/12.0/mac/10.14'}/>,&nbsp;&nbsp;<Link text={'Chrome'} url={'https://support.google.com/chrome/answer/95647?hl=de&hlrm=en'}/>,&nbsp;&nbsp;<Link text={'Firefox'} url={'https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen'}/>,&nbsp;&nbsp;<Link text={'Opera'} url={'https://help.opera.com/de/latest/web-preferences/#cookies'}/></Text>
          <Text style={s.T}>Bei der Nichtannahme von Cookies kann die Funktionalität unserer Website eingeschränkt sein.</Text>

          <Text style={[s.P, s.B]}>Einsatz von Google (Universal) Analytics zur Webanalyse</Text>
          <Text style={s.P}>Soweit Sie hierzu Ihre Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, setzt diese Website zum Zweck der Webseitenanalyse Google (Universal) Analytics ein. Der Webanalysedienst ist ein Angebot der Google Ireland Limited, einer nach irischem Recht eingetragenen und betriebenen Gesellschaft mit Sitz in Gordon House, Barrow Street, Dublin 4, Irland. (www.google.de). Google (Universal) Analytics verwendet Methoden, die eine Analyse der Benutzung der Website durch Sie ermöglichen, wie zum Beispiel Cookies. Die automatisch erhobenen Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Durch die Aktivierung der IP-Anonymisierung auf dieser Webseite wird dabei die IP-Adresse vor der Übermittlung innerhalb der Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte anonymisierte IP-Adresse wird grundsätzlich nicht mit anderen Daten von Google zusammengeführt. Nach Zweckfortfall und Ende des Einsatzes von Google Analytics durch uns werden die in diesem Zusammenhang erhobenen Daten gelöscht.</Text>
          <Text style={s.T}>Soweit Informationen auf Server von Google in den USA übertragen und dort gespeichert werden, ist die amerikanische Gesellschaft Google LLC unter dem EU-US-Privacy Shield zertifiziert. Ein aktuelles Zertifikat kann hier eingesehen werden. Aufgrund dieses Abkommens zwischen den USA und der Europäischen Kommission hat letztere für unter dem Privacy Shield zertifizierte Unternehmen ein angemessenes Datenschutzniveau festgestellt.</Text>
          
          <Text style={s.P}>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <Link text={'hier'} url={'https://tools.google.com/dlpage/gaoptout?hl=de'}/>. Hierdurch wird die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) sowie die Verarbeitung dieser Daten durch Google verhindert.</Text>
          <Text style={s.P}>Alternativ zum Browser-Plugin können Sie diesen Link klicken, um die Erfassung durch Google Analytics auf dieser Website zukünftig zu verhindern. Dabei wird ein Opt-Out-Cookie auf Ihrem Endgerät abgelegt. Löschen Sie Ihre Cookies, werden Sie erneut um Erteilung Ihrer Einwilligung gebeten.</Text>

          <Text style={[s.P, s.B]}>8. Online-Marketing</Text>
          <Text style={[s.P, s.B]}>Google Ads Remarketing</Text>
          <Text style={s.P}>Über Google Ads werben wir für diese Website in den Google Suchergebnissen sowie auf den Websites Dritter. Soweit Sie uns hierzu Ihre Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, wird bei Besuch unserer Website das sog. Remarketing Cookie von Google gesetzt, das automatisch mittels einer pseudonymen CookieID und auf Grundlage der von Ihnen besuchten Seiten eine interessenbasierte Werbung ermöglicht. Nach Zweckfortfall und Ende des Einsatzes von Google Ads Remarketing durch uns werden die in diesem Zusammenhang erhobenen Daten gelöscht.</Text>
          <Text style={s.P}>Eine darüber hinausgehende Datenverarbeitung findet nur statt, sofern Sie gegenüber Google zugestimmt haben, dass Ihr Web- und App-Browserverlauf von Google mit ihrem Google-Konto verknüpft wird und Informationen aus ihrem Google-Konto zum Personalisieren von Anzeigen verwendet werden, die sie im Web sehen. Sind sie in diesem Fall während des Seitenbesuchs unserer Webseite bei Google eingeloggt, verwendet Google Ihre Daten zusammen mit Google Analytics-Daten, um Zielgruppenlisten für geräteübergreifendes Remarketing zu erstellen und zu definieren. Dazu werden Ihre personenbezogenen Daten von Google vorübergehend mit Google Analytics-Daten verknüpft, um Zielgruppen zu bilden.</Text>
          <Text style={s.P}>Google Ads ist ein Angebot der Google Ireland Limited, einer nach irischem Recht eingetragenen und betriebenen Gesellschaft mit Sitz in Gordon House, Barrow Street, Dublin 4, Irland (www.google.de). Soweit Informationen auf Server von Google in den USA übertragen und dort gespeichert werden, ist die amerikanische Gesellschaft Google LLC unter dem EU-US-Privacy Shield zertifiziert. Ein aktuelles Zertifikat kann hier eingesehen werden. Aufgrund dieses Abkommens zwischen den USA und der Europäischen Kommission hat letztere für unter dem Privacy Shield zertifizierte Unternehmen ein angemessenes Datenschutzniveau festgestellt.</Text>
          <Text style={s.P}>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Remarketing-Cookie über diesen Link deaktivieren. Daneben können Sie sich bei der Digital Advertising Alliance über das Setzen von Cookies informieren und Einstellungen hierzu vornehmen.</Text>

          <Text style={[s.P, s.B]}>BingAds Remarketing</Text>
          <Text style={s.P}>Über BingAds werben wir für diese Website in den Bing, Yahoo und MSN Suchergebnissen sowie auf den Webseiten Dritter. Soweit Sie uns hierzu Ihre Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, wird bei Besuch unserer Webseite automatisch ein Cookie gesetzt, das automatisch mittels einer pseudonymen CookieID und auf Grundlage der von Ihnen besuchten Seiten eine interessenbasierte Werbung ermöglicht. Nach Zweckfortfall und Ende des Einsatzes von BingAds Remarketing durch uns werden die in diesem Zusammenhang erhobenen Daten gelöscht.</Text>
          <Text style={s.P}>BingAds ist ein Angebot der Microsoft Corporation (www.microsoft.com). Die Microsoft Corporation hat ihren Hauptsitz in den USA und ist zertifiziert unter dem EU-US-Privacy Shield. Ein aktuelles Zertifikat kann hier eingesehen werden. Aufgrund dieses Abkommens zwischen den USA und der Europäischen Kommission hat letztere für unter dem Privacy Shield zertifizierte Unternehmen ein angemessenes Datenschutzniveau festgestellt.</Text>
          <Text style={s.P}>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Remarketing-Cookie über diesen Link deaktivieren. Daneben können Sie sich bei der Digital Advertising Alliance über das Setzen von Cookies informieren und Einstellungen hierzu vornehmen.</Text>

          <Text style={[s.P, s.B]}>Affilinet-Partnerprogramm</Text>
          <Text style={s.T}>Unsere Webseite nimmt am Affilinet-Partnerprogramm teil. Dieses wird von der AWIN AG, Eichhornstraße 3, 10785 Berlin (nachfolgend „affilinet“) angeboten. Hierbei handelt es sich um ein sogenanntes Affiliatesystem, bei dem bei affilinet registrierte Personen (auch „Publisher“) die Produkte bzw. Dienstleistungen der sogenannten „Advertiser“ auf Ihren Webseiten mittels Werbemittel bewerben.</Text>
          <Text style={s.T}>Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer Optimierung und wirtschaftlichen Verwertung unseres Onlineangebots gemäß Art. 6 Abs. 1 lit. f) DSGVO.</Text>
          <Text style={s.T}>Mittels Cookies kann affilinet den Ablauf der jeweiligen Bestellung nachverfolgen und insbesondere nachvollziehen, dass Sie den jeweiligen Link angeklickt und sodann das Produkt über das Affiliate-Partnerprogramm bestellt haben.</Text>
          <Text style={s.P}>Sie können die Setzung von Cookies durch unsere Vertragspartner oder unsere Internetseite jederzeit mittels einer entsprechenden Einstellung Ihres Internetbrowsers verhindern. Zudem können bereits gesetzte Cookies jederzeit über den Internetbrowser oder andere Softwareprogramme gelöscht werden.</Text>
          <Text style={s.T}>Weitergehende Informationen zur Datenverarbeitung bei affilinet finden Sie hier.</Text>
          
          <Text style={[s.P, s.B]}>Google Maps</Text>
          <Text style={s.P}>Diese Website verwendet Google Maps zur visuellen Darstellung von geographischen Informationen. Google Maps ist ein Angebot der Google Ireland Limited, einer nach irischem Recht eingetragenen und betriebenen Gesellschaft mit Sitz in Gordon House, Barrow Street, Dublin 4, Irland (www.google.de). Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer optimierten Darstellung unseres Angebots sowie einer leichten Erreichbarkeit unserer Standorte gemäß Art. 6 Abs. 1 lit. f) DSGVO. Bei der Verwendung von Google Maps werden von Google Daten über die Nutzung der Maps-Funktionen durch Webseitenbesucher übermittelt bzw. verarbeitet, wozu insbesondere die IP-Adresse sowie Standortdaten gehören können. Wir haben keinen Einfluss auf diese Datenverarbeitung. Soweit Informationen auf Server von Google in den USA übertragen und dort gespeichert werden, ist die amerikanische Gesellschaft Google LLC unter dem EU-US-Privacy Shield zertifiziert. Ein aktuelles Zertifikat kann hier eingesehen werden. Aufgrund dieses Abkommens zwischen den USA und der Europäischen Kommission hat letztere für unter dem Privacy Shield zertifizierte Unternehmen ein angemessenes Datenschutzniveau festgestellt.</Text>
          <Text style={s.P}>Um den Service von Google Maps zu deaktivieren und damit die Datenübermittlung an Google zu verhindern, müssen Sie die Java-Script-Funktion in Ihrem Browser deaktivieren. In diesem Fall kann Google Maps nicht bzw. nur eingeschränkt genutzt werden. Weitergehende Informationen über die Datenverarbeitung durch Google finden Sie in den Datenschutzhinweisen von Google. Die Nutzungsbedingungen für Google Maps beinhalten detaillierte Informationen zum Kartendienst. Die Datenverarbeitung erfolgt auf Grundlage einer Vereinbarung zwischen gemeinsam Verantwortlichen gemäß Art. 26 DSGVO, die Sie hier einsehen können.</Text>

          <Text style={[s.P, s.B]}>Unsere Onlinepräsenz auf Facebook, Google, Twitter, Instagram</Text>
          <Text style={s.P}>Unsere Präsenz auf sozialen Netzwerken und Plattformen dient einer besseren, aktiven Kommunikation mit unseren Kunden und Interessenten. Wir informieren dort über unsere Produkte und laufende Sonderaktionen.</Text>
          <Text style={s.T}>Bei dem Besuch unserer Onlinepräsenzen in sozialen Medien können Ihre Daten für Marktforschungs- und Werbezwecke automatisch erhoben und gespeichert werden. Aus diesen Daten werden unter Verwendung von Pseudonymen sog. Nutzungsprofile erstellt. Diese können verwendet werden, um z.B. Werbeanzeigen innerhalb und außerhalb der Plattformen zu schalten, die mutmaßlich Ihren Interessen entsprechen. Zu diesem Zweck werden im Regelfall Cookies auf Ihrem Endgerät eingesetzt. In diesen Cookies werden das Besucherverhalten und die Interessen der Nutzer gespeichert. Dies dient gem. Art. 6 Abs. 1 lit. f. DSGVO der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer optimierten Darstellung unseres Angebots und effektiver Kommunikation mit den Kunden und Interessenten. Falls Sie von den jeweiligen Social-Media Plattformbetreibern um eine Einwilligung (Einverständnis) in die Datenverarbeitung gebeten werden, z.B. mit Hilfe einer Checkbox, ist die Rechtsgrundlage der Datenverarbeitung Art. 6 Abs. 1 lit. a DSGVO.</Text>
          <Text style={s.T}>Soweit die vorgenannten Social-Media Plattformen ihren Hauptsitz in den USA haben, gilt Folgendes: Für die USA liegt ein Angemessenheitsbeschluss der Europäischen Kommission vor. Dieser geht zurück auf den EU-US Privacy Shield. Ein aktuelles Zertifikat für das jeweilige Unternehmen kann hier eingesehen werden.</Text>
          <Text style={s.P}>Die detaillierten Informationen zur Verarbeitung und Nutzung der Daten durch die Anbieter auf deren Seiten sowie eine Kontaktmöglichkeit und Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre, insbesondere Widerspruchsmöglichkeiten (Opt-Out), entnehmen Sie bitte den unten verlinkten Datenschutzhinweisen der Anbieter. Sollten Sie diesbezüglich dennoch Hilfe benötigen, können Sie sich an uns wenden. <Link text={'Facebook'} url={'https://www.facebook.com/about/privacy/'}/>.</Text>
          <Text style={s.P}>Die Datenverarbeitung erfolgt auf Grundlage einer Vereinbarung zwischen gemeinsam Verantwortlichen gemäß Art. 26 DSGVO, die Sie hier einsehen können: <Link text={'hier'} url={'https://www.facebook.com/legal/terms/page_controller_addendum'}/></Text>

          <Text style={s.P}>
            <Link text={'Google'} url={'https://policies.google.com/privacy'}/>&nbsp;&nbsp;&nbsp;
            <Link text={'Twitter'} url={'https://twitter.com/de/privacy'}/>&nbsp;&nbsp;&nbsp;
            <Link text={'Instagram'} url={'https://help.instagram.com/519522125107875'}/>
          </Text>
          <Text style={s.P}>Widerspruchsmöglichkeit (Opt-Out):</Text>
          <Text style={s.T}>
            <Link text={'Facebook'} url={'https://www.facebook.com/settings?tab=ads'}/>&nbsp;&nbsp;&nbsp;
            <Link text={'Google'} url={'https://adssettings.google.com/authenticated/'}/>&nbsp;&nbsp;&nbsp;
            <Link text={'Twitter'} url={'https://twitter.com/personalization/'}/>&nbsp;&nbsp;&nbsp;
            <Link text={'Instagram'} url={'https://help.instagram.com/519522125107875/'}/>
          </Text>

          <Text style={[s.P, s.B]}>9. Versand von Bewertungserinnerungen per E-Mail</Text>
          <Text style={[s.P, s.B]}>Bewertungserinnerung durch Trusted Shops</Text>
          <Text style={s.P}>Sofern Sie uns hierzu während oder nach Ihrer Bestellung Ihre ausdrückliche Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, übermitteln wir Ihre E-Mail-Adresse an die Trusted Shops GmbH, Subbelrather Str. 15c, 50823 Köln (www.trustedshops.de), damit diese Ihnen eine Bewertungserinnerung per E-Mail zusendet.</Text>
          <Text style={s.P}>Diese Einwilligung kann jederzeit durch eine Nachricht an die unten beschriebene Kontaktmöglichkeit oder direkt gegenüber Trusted Shops widerrufen werden.</Text>

          <Text style={[s.P, s.B]}>10. Kontaktmöglichkeiten und Ihre Rechte</Text>
          <Text style={s.P}>Als Betroffener haben Sie folgende Rechte:</Text>
          <Text style={s.T}>&#x2713; gemäß Art. 15 DSGVO das Recht, in dem dort bezeichneten Umfang Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;</Text>
          <Text style={s.T}>&#x2713; gemäß Art. 16 DSGVO das Recht, unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</Text>
          <Text style={s.T}>&#x2713; gemäß Art. 17 DSGVO das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die weitere Verarbeitung</Text>
          <Text style={s.T}>&nbsp;-&nbsp;zur Ausübung des Rechts auf freie Meinungsäußerung und Information;</Text>
          <Text style={s.T}>&nbsp;-&nbsp;zur Erfüllung einer rechtlichen Verpflichtung;</Text>
          <Text style={s.T}>&nbsp;-&nbsp;aus Gründen des öffentlichen Interesses oder</Text>
          <Text style={s.T}>&nbsp;-&nbsp;zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;</Text>

          <Text style={s.T}>&#x2713; gemäß Art. 18 DSGVO das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit</Text>
          <Text style={s.T}>&nbsp;-&nbsp;die Richtigkeit der Daten von Ihnen bestritten wird;</Text>
          <Text style={s.T}>&nbsp;-&nbsp;die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen;</Text>
          <Text style={s.T}>&nbsp;-&nbsp;wir die Daten nicht mehr benötigen, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder</Text>
          <Text style={s.T}>&nbsp;-&nbsp;Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;</Text>

          <Text style={s.T}>&#x2713; gemäß Art. 20 DSGVO das Recht, Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</Text>
          <Text style={s.T}>&#x2713; gemäß Art. 77 DSGVO das Recht, sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Unternehmenssitzes wenden.</Text>
          
          <Text style={s.P}>Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Einschränkung oder Löschung von Daten sowie Widerruf ggf. erteilter Einwilligungen oder Widerspruch gegen eine bestimmte Datenverwendung wenden Sie sich bitte an unseren betrieblichen Datenschutzbeauftragten.</Text>
          <Text style={[s.P, s.B]}>Datenschutzbeauftragter:</Text>
          <Text style={s.P}>Christian Bunge</Text>
          <Text style={s.T}>Goethestraße 37a</Text>
          <Text style={s.T}>50858 Köln</Text>
          <Text style={s.T}>cb@cbunge.de</Text>
          <Text style={s.P}></Text>
          
          <Text style={[s.P, s.B]}>Widerspruchsrecht</Text>
          <Text style={s.P}>Soweit wir zur Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen personenbezogene Daten wie oben erläutert verarbeiten, können Sie dieser Verarbeitung mit Wirkung für die Zukunft widersprechen. Erfolgt die Verarbeitung zu Zwecken des Direktmarketings, können Sie dieses Recht jederzeit wie oben beschrieben ausüben. Soweit die Verarbeitung zu anderen Zwecken erfolgt, steht Ihnen ein Widerspruchsrecht nur bei Vorliegen von Gründen, die sich aus Ihrer besonderen Situation ergeben, zu.</Text>
          <Text style={s.P}>Nach Ausübung Ihres Widerspruchsrechts werden wir Ihre personenbezogenen Daten nicht weiter zu diesen Zwecken verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder wenn die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.</Text>
          <Text style={s.P}>Dies gilt nicht, wenn die Verarbeitung zu Zwecken des Direktmarketings erfolgt. Dann werden wir Ihre personenbezogenen Daten nicht weiter zu diesem Zweck verarbeiten.</Text>
        </View>
      );
      break;
    default: content = (
      <View>
        <Text style={s.Header}>{title}</Text>
        <Text>Agreement text not found!</Text>
      </View>
    );
  }
  return content;
}
function Link(props) {
  const {url} = props;
  const {text} = props;
  return (
    <Text
      style={s.A} 
      onPress={() => Linking.openURL(url)}>
      {text}
    </Text>
  );
}

function ActionBack(nav) {
  return (
    <View style={s.ActionConteiner}>
      <TouchableOpacity onPress={() => nav.back()} style={s.ActionButton}>
        <Text style={s.ActionText}>Zurück</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  Conteiner: { flex: 1, flexDirection: 'column', marginHorizontal: 10 },
  ActionConteiner: {
    borderTopWidth: 0.5,
    borderColor: '#A7A7AA',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  ActionButton: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 60
  },
  ActionText: { color: '#FFFFFF' },

  Header: { fontSize: 20, fontWeight: 'bold', color: 'black', marginVertical: 5 },
  P: { fontSize: 16, color: 'black', textAlign: 'justify', marginTop: 5, marginBottom: 5 },
  T: { fontSize: 16, color: 'black', textAlign: 'justify' },
  F: { fontSize: 15, color: 'black', textAlign: 'justify', marginBottom: 10 },
  B: { fontWeight: 'bold' },
  A: { color: '#007BFF' },
});
