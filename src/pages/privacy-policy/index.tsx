import { Container, Grid, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'

import React from 'react'
import en from '@app/locales/privacy-policy/en'
import th from '@app/locales/privacy-policy/th'
import { useRouter } from 'next/router'

const Policy: NextPage = () => {
  return (
    <>
      <PolicyPage />
    </>
  )
}

export default Policy

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, locales } = context
  return {
    props: {
      locale,
      locales
    }
  }
}

function PolicyPage() {
  const router = useRouter()
  const { locale } = router
  const t: any = locale === 'en' ? en : th

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} mt={1}>
        <Grid item container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h5" color="primary">
              {t['title']}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{t['subTitle']}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{t['updateat']}</Typography>
          </Grid>
          {Array.isArray(t['detail']) ? (
            <Grid item>
              {t['detail'].map((v, k) => (
                <Typography key={`detail-${k}`}>{v}</Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['detail']}</Typography>
            </Grid>
          )}
          <Grid item>
            <Typography variant="h6">{t['vision']}</Typography>
          </Grid>

          {Array.isArray(t['visionDetail']) ? (
            <Grid item>
              {t['visionDetail'].map((v, k) => (
                <Typography component="p" mb={0.5} ml={2} key={`detail-${k}`}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['visionDetail']}</Typography>
            </Grid>
          )}

          {/* Mission */}
          <Grid item>
            <Typography variant="h6">{t['mission']}</Typography>
          </Grid>
          {Array.isArray(t['missionDetail']) ? (
            <Grid item>
              {t['missionDetail'].map((v, k) => (
                <Typography
                  key={`missionDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['missionDetail']}</Typography>
            </Grid>
          )}

          {/* BUSINESS */}
          <Grid item>
            <Typography variant="h6">{t['business']}</Typography>
          </Grid>
          {Array.isArray(t['businessDetail']) ? (
            <Grid item>
              {t['businessDetail'].map((v, k) => (
                <Typography
                  key={`businessDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['businessDetail']}</Typography>
            </Grid>
          )}

          {/* TARGETED */}
          <Grid item>
            <Typography variant="h6">{t['targeted']}</Typography>
          </Grid>
          {Array.isArray(t['targetedDetail']) ? (
            <Grid item>
              {t['targetedDetail'].map((v, k) => (
                <Typography
                  key={`targetedDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['targetedDetail']}</Typography>
            </Grid>
          )}

          {/* COMMUNICATIONS */}
          <Grid item>
            <Typography variant="h6">{t['communications']}</Typography>
          </Grid>
          {Array.isArray(t['communicationsDetail']) ? (
            <Grid item>
              {t['communicationsDetail'].map((v, k) => (
                <Typography
                  key={`communicationsDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['communicationsDetail']}</Typography>
            </Grid>
          )}

          {/* SUPPORTED */}
          <Grid item>
            <Typography variant="h6">{t['supported']}</Typography>
          </Grid>
          {Array.isArray(t['supportedDetail']) ? (
            <Grid item>
              {t['supportedDetail'].map((v, k) => (
                <Typography
                  key={`supportedDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['supportedDetail']}</Typography>
            </Grid>
          )}

          {/* COMMISSION */}
          <Grid item>
            <Typography variant="h6">{t['commission']}</Typography>
          </Grid>
          {Array.isArray(t['commissionDetail']) ? (
            <Grid item>
              {t['commissionDetail'].map((v, k) => (
                <Typography
                  key={`commissionDetail-${k}`}
                  component="p"
                  mb={0.5}
                  ml={2}>
                  {v}
                </Typography>
              ))}
            </Grid>
          ) : (
            <Grid item>
              <Typography>{t['commissionDetail']}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
