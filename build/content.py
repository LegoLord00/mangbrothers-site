"""Single source of truth for the style explorations. Every template pulls from here.
Copy follows the Russel Voice: direct, no contractions, no em-dashes, no flattery."""

PHONE_DISPLAY = "(734) 450-2400"
PHONE_TEL = "tel:+17344502400"
SMS_BODY = "Hi, I would like a quote for [service] at [address]."
SMS_LINK = "sms:+17344502400?&body=" + SMS_BODY.replace(" ", "%20").replace("[", "%5B").replace("]", "%5D").replace(",", "%2C")
EMAIL = "admin@mangbrothers.com"
MAILTO = "mailto:admin@mangbrothers.com?subject=Quote%20request"

COMPANY = "Mangiapane Brothers Lawn & Snow LLC"
SHORT = "Mangiapane Brothers"
TAGLINE = "Reliable Service. Uncompromising Standards."
POSITIONING = "Full-service property maintenance for those who take pride in their home."
AREA = "Livonia and Westland, Michigan"
NEIGHBORHOODS = ["Rosedale Gardens", "Northern Livonia", "Newburgh and 7 Mile", "Westland"]

HOURS = "Monday to Saturday, 7:00 a.m. to 7:00 p.m."

SERVICES = [
    {
        "key": "lawn",
        "name": "Lawn Mowing and Edging",
        "season": "Spring to Fall",
        "blurb": "Weekly or biweekly cuts with clean edges along every walk and drive. Same crew, same day each week.",
        "price": "Quoted by phone",
        "note": "Priced by lot. Most Livonia lots are quoted in one call.",
        "img": "lawn-stripes-colonial",
    },
    {
        "key": "fall",
        "name": "Fall Cleanup",
        "season": "October to November",
        "blurb": "Two leaf visits timed to your section's city pickup. Gutters cleared on the final visit. Beds, sticks, and branches to the curb. Gutter cleaning is included, never sold separately.",
        "price": "From $435",
        "note": "Season price, one-storey home. Two-storey and corner lots quoted by phone.",
        "img": "ba-front-yard",
    },
    {
        "key": "snow",
        "name": "Snow Removal",
        "season": "November 1 to March 15",
        "blurb": "Seasonal residential contract. One-inch trigger. Salt on every push. Cleared within 24 hours of the storm ending, and never before 7 a.m. A time-stamped photo after every visit.",
        "price": "From $550",
        "note": "Sixteen pushes covered. Your total is capped, so the worst winter on record has a known cost.",
        "img": "lawn-street-view",
    },
    {
        "key": "landscape",
        "name": "Landscaping",
        "season": "Spring to Fall",
        "blurb": "Mulch, rock, and gravel. Bush and hedge removal, installation, and trimming. Brick and stone bed edging. Tree and shrub removal. Drainage.",
        "price": "Quoted on site",
        "note": "Walked and quoted in writing before any work starts.",
        "img": "gazebo-landscape",
    },
    {
        "key": "lights",
        "name": "Christmas Lights",
        "season": "November",
        "blurb": "Installed, on a timer, and taken down in January. Every light lit by Thanksgiving. Twelve homes this year, then the calendar is full.",
        "price": "From $895",
        "note": "Full Front package, one-storey. Wreath hung and included.",
        "img": "hedge-brick",
    },
    {
        "key": "gutters",
        "name": "Gutter Cleaning",
        "season": "Spring and Fall",
        "blurb": "Included with every Fall Cleanup. Available on its own in spring.",
        "price": "Included in Fall Cleanup",
        "note": "Spring standalone visits quoted by phone.",
        "img": "hedge-brick",
    },
]

WHY = [
    ("We show up", "Same crew, same day, every week. If weather moves us, you hear from us first."),
    ("Done right, not close enough", "Edges cut, beds clean, debris gone. We do not leave a job we would not put our name on."),
    ("A known price", "Season prices are printed. Snow has a stated maximum. There is no surprise invoice."),
    ("Family owned, Livonia based", "Two brothers, one crew list, and a phone that gets answered."),
]

PROMISES = [
    ("24 hours", "Snow cleared within 24 hours of the storm ending"),
    ("7 a.m.", "We never run equipment before seven"),
    ("Photo", "Time-stamped photo after every snow visit"),
    ("Capped", "Your worst-case winter cost is stated up front"),
]

STORY = [
    "Mangiapane Brothers started with two brothers, a mower, and the houses we grew up around in Livonia.",
    "We still run it that way. Russel answers the phone. The crew that cuts your lawn in June is the crew that clears your gutters in November and your driveway in January.",
    "We are not the cheapest option on your street. We are the one that shows up, does the work to a standard, and does not make you chase us. That is the whole business.",
]

BEFORE_AFTER = [
    ("ba-bed-cleanup", "Bed cleanup and rock border"),
    ("ba-front-yard", "Front yard reset"),
    ("ba-porch-bed", "Porch bed rebuild"),
    ("ba-hedge-side", "Hedge shaping"),
    ("ba-hedge-removal", "Overgrowth removal"),
]

GALLERY = [
    ("lawn-stripes-colonial", "Weekly cut, Rosedale Gardens"),
    ("lawn-edge-garage", "Clean edge along the drive"),
    ("bed-rock-border", "Rock border and bed install"),
    ("gazebo-landscape", "Full landscape install"),
    ("lawn-stripes-close", "Stripes on a Thursday"),
    ("hedge-brick", "Hedge trim and bed"),
]

FOOTER_NOTE = "Serving Livonia and Westland, Michigan. Licensed and insured."

YEAR = 2026

# Shared, minimal head snippet pieces
CONTACT_CTAS = f"""
<a class="cta cta-call" href="{PHONE_TEL}" data-track="call">Call {PHONE_DISPLAY}</a>
<a class="cta cta-text" href="{SMS_LINK}" data-track="text">Text for a quote</a>
<a class="cta cta-mail" href="{MAILTO}" data-track="email">{EMAIL}</a>
"""

SCHEMA = """
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Mangiapane Brothers Lawn & Snow LLC",
"telephone":"+1-734-450-2400","email":"admin@mangbrothers.com","url":"https://mangbrothers.com",
"areaServed":["Livonia, MI","Westland, MI"],"address":{"@type":"PostalAddress","addressLocality":"Livonia","addressRegion":"MI","addressCountry":"US"},
"slogan":"Reliable Service. Uncompromising Standards."}
</script>
"""
