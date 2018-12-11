import * as Immutable from "immutable";

const baseState = {
  app: {
    dateToday: new Date(2018, 12, 10)
  }
};

const stateWithData = {
  ...baseState,
  employees: {
    loading: false,
    data: new Immutable.OrderedMap([
      [
        "1",
        {
          id: 1,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "CEO",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-08-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Ektefelle",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Slependen",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "2",
        {
          id: 2,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Leder teknologi",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-08-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🐸",
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "3",
        {
          id: 3,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Leder design",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-09-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🎅",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "4",
        {
          id: 4,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-10-12",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🧙",
          customer_id: "KOL",
          customer_name: "Kolonial.no"
        }
      ],
      [
        "5",
        {
          id: 5,
          first_name: "Blank",
          last_name: "Blankestad",
          title: " Sutorīto Faitā",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-09-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "6",
        {
          id: 6,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-01-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "😐",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "7",
        {
          id: 7,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-01-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: null,
          postal_code: null,
          city: null,
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "😶",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "8",
        {
          id: 8,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Señor Utvikler",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-03-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🐴",
          customer_id: "IME",
          customer_name: "Imerso"
        }
      ],
      [
        "9",
        {
          id: 9,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknologist",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-04-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🎅",
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "10",
        {
          id: 10,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-09-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Kone",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🍕",
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "11",
        {
          id: 11,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-02-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Gift",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🌝",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "12",
        {
          id: 12,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "CTO",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-01-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Jar",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🕴",
          customer_id: "TNO",
          customer_name: "Telenor"
        }
      ],
      [
        "14",
        {
          id: 14,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-09-01",
          termination_date: "2018-12-31",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "GYL",
          customer_name: "Gyldendal"
        }
      ],
      [
        "15",
        {
          id: 15,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2015-09-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Mann",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "OSLO",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🤖",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "16",
        {
          id: 16,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-05-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Ås",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "17",
        {
          id: 17,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-06-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "👰",
          customer_id: "RUT",
          customer_name: "Ruter"
        }
      ],
      [
        "18",
        {
          id: 18,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-06-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Eiksmarka",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "2PA",
          customer_name: "2 Park Technologies AS"
        }
      ],
      [
        "19",
        {
          id: 19,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2016-08-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "GYL",
          customer_name: "Gyldendal"
        }
      ],
      [
        "21",
        {
          id: 21,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2015-08-17",
          termination_date: "2017-09-30",
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "22",
        {
          id: 22,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-08-01",
          termination_date: "2017-12-31",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Ektefelle",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Ski",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "26",
        {
          id: 26,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-10-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🙈",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "28",
        {
          id: 28,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-09-01",
          termination_date: "2017-09-10",
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Råholt",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "33",
        {
          id: 33,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Salgssjef",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2016-09-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Kone",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Asker",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "34",
        {
          id: 34,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Foretningsdesigner",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2016-09-05",
          termination_date: "2017-06-16",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: null,
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "36",
        {
          id: 36,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-01-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Ektefelle",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Hamar",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "2PA",
          customer_name: "2 Park Technologies AS"
        }
      ],
      [
        "37",
        {
          id: 37,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Creative Director",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-02-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "💩",
          customer_id: "RMK",
          customer_name: "reMarkable"
        }
      ],
      [
        "38",
        {
          id: 38,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2017-02-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Gift",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "40",
        {
          id: 40,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-01-02",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🧠",
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "41",
        {
          id: 41,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-02-08",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Snarøya",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🙏",
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "42",
        {
          id: 42,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-08-01",
          termination_date: "2018-10-31",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Mor",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: null,
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "43",
        {
          id: 43,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2017-08-15",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Mor",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🐼",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "44",
        {
          id: 44,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog, sommerjobb",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-05-22",
          termination_date: "2017-08-04",
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: false,
          emoji: null
        }
      ],
      [
        "46",
        {
          id: 46,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog Sommerjobb",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-05-26",
          termination_date: "2017-08-04",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Forelder",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Trondheim",
          image_url: null,
          has_permanent_position: false,
          emoji: null
        }
      ],
      [
        "50",
        {
          id: 50,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Snapchatter",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2017-08-07",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Mamz",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🔥",
          customer_id: "RMK",
          customer_name: "reMarkable"
        }
      ],
      [
        "51",
        {
          id: 51,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2017-08-14",
          termination_date: "2017-12-31",
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "55",
        {
          id: 55,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2018-03-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Samboer",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "56",
        {
          id: 56,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-02-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Bror",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🐒",
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "57",
        {
          id: 57,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-04-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🙃",
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "59",
        {
          id: 59,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-02-05",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Kone",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null,
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "61",
        {
          id: 61,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2018-08-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🦕"
        }
      ],
      [
        "63",
        {
          id: 63,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-04-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Kone",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Kolbotn",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "✎"
        }
      ],
      [
        "64",
        {
          id: 64,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Designer",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-06-01",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Kone",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🍑",
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "66",
        {
          id: 66,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Utvikler",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-06-12",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Mor",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Høvik",
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "67",
        {
          id: 67,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "female",
          birth_date: "2018-01-01",
          date_of_employment: "2018-08-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: null,
          postal_code: null,
          city: null,
          image_url: "http://bullshit.uri",
          has_permanent_position: true,
          emoji: "🦖"
        }
      ],
      [
        "68",
        {
          id: 68,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2019-08-01",
          termination_date: null,
          emergency_contact_name: nBlankerelationl,
          emergency_contact_phone: null,
          emergency_contact_relation: null,
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: null,
          has_permanent_position: true,
          emoji: null
        }
      ],
      [
        "70",
        {
          id: 70,
          first_name: "Blank",
          last_name: "Blankestad",
          title: "Teknolog",
          phone: "66663333",
          email: "blankemann@blank.no",
          gender: "male",
          birth_date: "2018-01-01",
          date_of_employment: "2018-09-10",
          termination_date: null,
          emergency_contact_name: "Blankerelation",
          emergency_contact_phone: "66663333",
          emergency_contact_relation: "Far",
          address: "Blankisgata 666",
          postal_code: "1234",
          city: "Oslo",
          image_url: null,
          has_permanent_position: true,
          emoji: "🦆"
        }
      ]
    ]),
    removeTerminated: true
  },
  employeesProjects: {
    loading: false,
    data: new Immutable.OrderedMap([
      [
        "2",
        {
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "3",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "4",
        {
          customer_id: "KOL",
          customer_name: "Kolonial.no"
        }
      ],
      [
        "5",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "6",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "7",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "8",
        {
          customer_id: "IME",
          customer_name: "Imerso"
        }
      ],
      [
        "9",
        {
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "10",
        {
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "11",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "12",
        {
          customer_id: "TNO",
          customer_name: "Telenor"
        }
      ],
      [
        "14",
        {
          customer_id: "GYL",
          customer_name: "Gyldendal"
        }
      ],
      [
        "15",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "16",
        {
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "17",
        {
          customer_id: "RUT",
          customer_name: "Ruter"
        }
      ],
      [
        "18",
        {
          customer_id: "2PA",
          customer_name: "2 Park Technologies AS"
        }
      ],
      [
        "19",
        {
          customer_id: "GYL",
          customer_name: "Gyldendal"
        }
      ],
      [
        "26",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "36",
        {
          customer_id: "2PA",
          customer_name: "2 Park Technologies AS"
        }
      ],
      [
        "37",
        {
          customer_id: "RMK",
          customer_name: "reMarkable"
        }
      ],
      [
        "38",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "40",
        {
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "41",
        {
          customer_id: "DIS",
          customer_name: "Distribution Innovation"
        }
      ],
      [
        "43",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ],
      [
        "50",
        {
          customer_id: "RMK",
          customer_name: "reMarkable"
        }
      ],
      [
        "56",
        {
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "57",
        {
          customer_id: "GJE",
          customer_name: "Gjensidige"
        }
      ],
      [
        "59",
        {
          customer_id: "NRK",
          customer_name: "NRK"
        }
      ],
      [
        "64",
        {
          customer_id: "ICE",
          customer_name: "ice.net"
        }
      ]
    ])
  }
};

export const stateWithoutData = {
  ...baseState,
  employees: {
    loading: true,
    data: null
  },
  employeesProjects: {
    loading: true,
    data: null
  }
};

export const stateWithDataKeepTerminated = {
  ...baseState,
  employees: { ...stateWithData.employees, removeTerminated: false },
  employeesProjects: stateWithData.employeesProjects
};

export const stateWithDataRemoveTerminated = {
  ...baseState,
  employees: { ...stateWithData.employees, removeTerminated: true },
  employeesProjects: stateWithData.employeesProjects
};
