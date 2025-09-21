import { Button, Divider, NumberFormatter } from "@mantine/core";
import { useMemo } from "react";
import { NumberAdd } from "../../types";

type Props = {
  setRaport: React.Dispatch<React.SetStateAction<NumberAdd | null>>;
  raport: NumberAdd;
};
export const RaportAddNumber: React.FC<Props> = ({ raport, setRaport }) => {
  const handleClose = () => setRaport(null);

  const totalInfo = [
    {
      text: "К-во дублей в базе",
      value: raport.importHistory.duplicates_in_base,
    },
    {
      text: "К-во дублей в файле",
      value: raport.importHistory.duplicates_in_file,
    },
    {
      text: "К-во некорректных номеров",
      value: raport.importHistory.incorrect_numbers,
    },
    {
      text: "К-во импортированных",
      value: raport.importHistory.unique_numbers,
    },
  ];

  const filterNull = useMemo(() => {
    const filterData = raport.duplicatesByTypes.filter((item) => {
      return item.count > 0;
    });

    return filterData;
  }, []);

  return (
    <div>
      <div className="flex justify-end my-5">
        <Button
          variant="outline"
          color="red"
          size="xs"
          radius="xs"
          onClick={handleClose}
        >
          закрыть
        </Button>
      </div>
      <div className="flex flex-col justify-between min-w-[40vw] border-2 p-4 bg-white text-black">
        <div>
          <div className="flex justify-between font-bold">
            <p>Категория</p>
            <p>К-во дублей</p>
          </div>
          <Divider my="xs" />
          <div className="max-h-[30vh] overflow-auto p-3">
            {filterNull.map((item) => (
              <div
                key={item.name + item.count}
                className="flex justify-between pb-0.5"
              >
                <p className="pr-7">{item.name}</p>

                <NumberFormatter
                  thousandSeparator="."
                  decimalSeparator=","
                  value={item.count}
                />
              </div>
            ))}
          </div>
        </div>
        <Divider my="xs" />
        <div className="flex flex-col gap-2 font-bold">
          {totalInfo.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p>{item.text}</p>

              <NumberFormatter
                thousandSeparator="."
                decimalSeparator=","
                value={item.value}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
