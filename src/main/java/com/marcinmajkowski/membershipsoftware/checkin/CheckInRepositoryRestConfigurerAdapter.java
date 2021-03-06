package com.marcinmajkowski.membershipsoftware.checkin;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class CheckInRepositoryRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
        validatingListener.addValidator("beforeCreate", new CheckInValidator());
        validatingListener.addValidator("beforeSave", new CheckInValidator());
    }
}
