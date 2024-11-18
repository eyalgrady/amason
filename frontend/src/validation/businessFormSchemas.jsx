import Joi from "joi";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,30}$/;
const phoneRegex =
  /^(?:\+972|0)(?:5[0-9]|2[0-9]|3[0-9]|4[0-9]|7[0-9]|8[0-9]|9[0-9])\d{7}$/;

const baseSchema = {
  _id: Joi.string().allow(""),
  name: Joi.string().min(2).max(20).allow(""),
  phone: Joi.string().pattern(phoneRegex).min(9).max(11).allow(""),
  email: Joi.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .allow(""),
  password: Joi.string().pattern(passwordRegex).allow(""),
  oldPassword: Joi.string().allow(""),
  newPassword: Joi.string().pattern(passwordRegex).allow(""),
  businessName: Joi.string().min(2).max(20).allow(""),
  address: Joi.object({
    postcode: Joi.number().allow(""),
    street: Joi.string().min(2).max(256).allow(""),
    optionalText: Joi.string().min(2).max(256).allow(""),
    city: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).allow(""),
  }).optional(),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }).optional(),
  isBusiness: true,
  isChecked: false,
};

export const schema = Joi.object({
  ...baseSchema,
  name: Joi.string()
    .min(2)
    .max(20)
    .when(Joi.ref("$isFirstStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
  phone: Joi.string().pattern(phoneRegex).min(9).max(11).allow(""),
  email: Joi.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .when(Joi.ref("$isFirstStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
  password: Joi.string().pattern(passwordRegex).when("$isNewUser", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  oldPassword: Joi.string().when("$isNewUser", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  newPassword: Joi.string().pattern(passwordRegex).when("$isNewUser", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  businessName: Joi.string().when(Joi.ref("$isSecondStep"), {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow(""),
  }),
  address: Joi.object({
    postcode: Joi.number().when(Joi.ref("$isSecondStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
    street: Joi.string().when(Joi.ref("$isSecondStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
    optionalText: Joi.string().min(2).max(256).allow(""),
    city: Joi.string().when(Joi.ref("$isSecondStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
    country: Joi.string().when(Joi.ref("$isSecondStep"), {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(""),
    }),
  }).when(Joi.ref("$isSecondStep"), {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  image: Joi.object({
    url: Joi.string()
      .min(14)
      .when(Joi.ref("$isSecondStep"), {
        is: true,
        then: Joi.required(),
        otherwise: Joi.allow(""),
      }),
    alt: Joi.string()
      .min(2)
      .max(256)
      .when(Joi.ref("$isSecondStep"), {
        is: true,
        then: Joi.required(),
        otherwise: Joi.allow(""),
      }),
  }).when(Joi.ref("$isSecondStep"), {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

// פונקציה לבדוק אם הסיסמה הישנה תואמת
// const checkOldPassword = async (oldPassword, businessId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8060/users/${businessId}/check-old-password`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ oldPassword }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to check old password");
//     }

//     const data = await response.json();
//     return data.isValid; // יש להניח שהשרת מחזיר true/false
//   } catch (error) {
//     console.error("Error checking old password:", error);
//     return false; // במקרה של שגיאה, נניח שהסיסמה לא תואמת
//   }
// };
