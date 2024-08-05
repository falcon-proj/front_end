import { useRef, useState } from "react";
import axios from "@/api/axios";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AdminRuleBookUpload() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleUploadRuleBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const file = e.target.files[0];

    formData.append("file", file);
    formData.append("name", fileName);
    setFileName("");
    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("uploaded");
        if (response.data?.error) {
          console.log(response.data.error);
          toast({
            variant: "destructive",
            description: response.data.error,
          });
        } else {
          toast({
            variant: "success",
            description: response.data,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <input
        type="file"
        id="file"
        name="file"
        className="hidden w-0 h-0"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleUploadRuleBook}
      />

      <div className="flex justify-end  items-center w-1/3 gap-1  float-end border p-2 rounded-lg bg-black">
        <h2 className="text-sm text-center w-1/2">Upload RuleBook</h2>
        <Input
          className="w-1/2"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button
          className="w-1/2  disabled:bg-primary disabled:cursor-not-allowed"
          size="sm"
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={fileName === ""}
        >
          Upload
        </Button>
      </div>
    </form>
  );
}
