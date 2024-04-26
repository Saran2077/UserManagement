import capitalize from "@mui/material/utils/capitalize";
import { User } from "../utils/config";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface CustomGenderLayoutProps {
  userData: User;
  genderChange: (gender: string) => void;
}
const CustomGenderLayout: React.FC<CustomGenderLayoutProps> = ({
  userData,
  genderChange,
}) => {
  function getGender(value: string) {
    genderChange(value);
  }

  let genderArray = [
    {
      title: "male",
      image: "https://cdn.dev.sporfy.com/trackboard/commons/png/male.png",
    },
    {
      title: "female",
      image: "https://cdn.dev.sporfy.com/trackboard/commons/png/female.png",
    },
    {
      title: "other",
      image: "https://cdn.dev.sporfy.com/trackboard/commons/png/others.png",
    },
  ];
  return (
    <div>
      <div className="mt-8 mb-4 md:mb-0 flex flex-row items-center justify-start cursor-pointer noSelect">
        {genderArray.map((prop, key) => {
          return (
            <div key={key} className="ml-4">
              <div className="flex">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={capitalize(prop?.title)}
                    control={
                      <Radio
                        onClick={() => {
                          getGender(prop?.title);
                        }}
                        checked={prop?.title === userData?.gender}
                      />
                    }
                    label={capitalize(prop?.title)}
                  />
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CustomGenderLayout;
