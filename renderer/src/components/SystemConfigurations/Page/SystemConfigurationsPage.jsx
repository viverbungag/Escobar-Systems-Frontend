import React, { useState, useEffect } from 'react';
import styles from "./SystemConfigurationsPage.module.scss";
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';
import { useRouter } from "next/router";
import { TextField, FilledInput  } from '@mui/material';
import SystemConfigurationsButton from '../Shared/Buttons/SystemConfigurationsButton';
import Rest from "../../../rest/Rest.tsx";
import SystemConfigurationsModel from "../../../model/SystemConfigurationsModel.tsx";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const SystemConfigurationsPage = () => {

    const router = useRouter();
    const rest = new Rest();

    const handleBackButtonOnClick = () => {
        localStorage.getItem("isAdmin") === "true"
          ? router.push("/main-admin-dashboard")
          : router.push("/main-employee-dashboard");
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const [systemConfigurations, setSystemConfigurations] = useState(new SystemConfigurationsModel("", 0));

    const handleVoidPasswordOnChange = (event) => {
        setSystemConfigurations(
          new SystemConfigurationsModel(
            event.target.value,
            systemConfigurations.numberOfTables
          )
        );
    }

    const handleNumberOfTablesOnChange = (event) => {
        const numberOfTablesValue = event.target.value;
        setSystemConfigurations(
            new SystemConfigurationsModel(
            systemConfigurations.voidPassword,
            numberOfTablesValue
            )
        );
    }
    const handleSaveConfigurationsButtonOnClick = () => {
      rest.post(
          `${INITIAL_URL}/system-configurations/update`,
          systemConfigurations,
          ()=>{},
          "Successfully updated the configuration/s"
      );
  }

    const handleGetSystemConfigurationsSuccess = (contents) => {
        setSystemConfigurations(
            new SystemConfigurationsModel(contents.voidPassword, contents.numberOfTables)
        );
    }


    const getSystemConfigurations = () => {
        rest.get(
            `${INITIAL_URL}/system-configurations`,
            handleGetSystemConfigurationsSuccess
        )
    }

    useEffect(()=>{
        getSystemConfigurations();
    },[])

  return (
    <div className={styles["system-configurations-page"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick} />
      <header className={styles["system-configurations-page--header"]}>
        <h1>SYSTEM CONFIGURATIONS</h1>
      </header>

      <div className={styles["system-configurations-page--content-container"]}>
        <div className={styles["system-configurations-page--content"]}>
          <div className={styles["system-configurations-page--input-field"]}>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Void Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                variant="filled"
                value={systemConfigurations.voidPassword}
                onChange={handleVoidPasswordOnChange}
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={styles["system-configurations-page--input-field"]}>
            <TextField
              id="filled-textarea"
              label="Number of Tables"
              variant="filled"
              type="number"
              value={systemConfigurations.numberOfTables}
              onChange={handleNumberOfTablesOnChange}
              fullWidth
            />
          </div>
          <SystemConfigurationsButton label="Save Configurations" onClick={handleSaveConfigurationsButtonOnClick} />
        </div>
      </div>
    </div>
  );
}

export default SystemConfigurationsPage